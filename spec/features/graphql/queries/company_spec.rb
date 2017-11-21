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

  let(:variables) { { slug: slug } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { user_one }

  include_context 'with data setup'
  include_context 'with query execution setup'

  describe 'authentication' do
    let(:slug) { company_one.slug }

    include_context 'with stubbed policies'

    context 'when there is a current user' do
      let(:current_user) { user_one }

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
    include_context 'with stubbed policies'

    context 'when passed a slug that belongs to a company' do
      let(:slug) { company_one.slug }

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

    let(:slug) { company_one.slug }
    let(:create_user_one) { true }
    let(:create_user_two) { true }
    let(:user_one_shift_count) { 1 }
    let(:user_two_shift_count) { 1 }

    include_context 'with stubbed policies'

    specify { expect(data[:company][:slug]).to eq(slug) }
    specify { expect(errors).to be_nil }

    it 'includes only users within the company' do
      expect(data[:company][:users].pluck(:id)).to contain_exactly(user_one.id)
    end

    it 'includes only shifts within the company' do
      expect(data[:company][:shifts].pluck(:id)).to contain_exactly(user_one.shifts.first.id)
    end
  end
end
