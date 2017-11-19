# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'query { company }' do
  subject(:query) do
    <<~GRAPHQL
      query Company($slug: String!) {
        company(slug: $slug) {
          slug
        }
      }
    GRAPHQL
  end

  let(:execution_result) do
    SomeSchedulesSchema.execute(
      query,
      variables: deep_camelize_keys(variables.with_indifferent_access),
      context: context
    ).with_indifferent_access
  end
  let(:data) { execution_result[:data] }
  let(:errors) { execution_result[:errors] }
  let(:variables) { { slug: slug } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { create(:user) }
  let(:company) { create(:company) }

  include_context 'stub_policies'

  describe 'authentication' do
    let(:slug) { company.slug }

    context 'when there is a current user' do
      let(:current_user) { create(:user) }

      specify { expect(data[:company][:slug]).to eq(slug) }
      specify { expect(errors).to be_nil }
    end

    context 'when there is not a current user' do
      let(:current_user) { nil }

      specify { expect(data[:company]).to be_nil }
      specify { expect(errors.pluck(:message)).to include(match(/authentication/i)) }
    end
  end

  describe 'querying for just the company' do
    context 'when passed a slug that belongs to a company' do
      let(:slug) { company.slug }

      specify { expect(data[:company][:slug]).to eq(slug) }
      specify { expect(errors).to be_nil }
    end

    context 'when passed a slug that does not belong to a company' do
      let(:slug) { 'does-not-exist' }

      specify { expect(data[:company]).to be_nil }
      specify { expect(errors).to be_nil }
    end
  end

  describe 'querying for just the company and its relations' do
    subject(:query) do
      <<~GRAPHQL
        query Company($slug: String!) {
          company(slug: $slug) {
            slug
            users {
              id
            }
            shifts {
              id
            }
          }
        }
      GRAPHQL
    end

    let(:slug) { company.slug }
    let!(:company_user) { company.users.create(attributes_for(:user)) }
    let!(:company_shift) { company_user.shifts.create(attributes_for(:shift)) }

    before do
      create(:company, :with_owner).tap do |other_company|
        other_company.users.first.shifts.create(attributes_for(:shift))
      end
    end

    specify { expect(data[:company][:slug]).to eq(slug) }
    specify { expect(errors).to be_nil }

    it 'includes only users within the company' do
      expect(data[:company][:users].pluck(:id)).to contain_exactly(company_user.id)
    end

    it 'includes only shifts within the company' do
      expect(data[:company][:shifts].pluck(:id)).to contain_exactly(company_shift.id)
    end
  end
end
