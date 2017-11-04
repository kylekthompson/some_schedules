# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'query { user }' do
  subject(:query) do
    <<~GRAPHQL
      query {
        user(id: #{id}) {
          id
        }
      }
    GRAPHQL
  end

  let(:execution_result) do
    SomeSchedulesSchema.execute(
      query,
      variables: variables,
      context: context
    ).with_indifferent_access
  end
  let(:data) { execution_result[:data] }
  let(:errors) { execution_result[:errors] }
  let(:variables) { { id: id } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { create(:user) }
  let(:user) { create(:user) }

  describe 'authentication' do
    let(:id) { user.id }

    context 'when there is a current user' do
      let(:current_user) { create(:user) }

      specify { expect(data[:user][:id]).to eq(id) }
      specify { expect(errors).to be_nil }
    end

    context 'when there is not a current user' do
      let(:current_user) { nil }

      specify { expect(data[:user]).to be_nil }
      specify { expect(errors.pluck(:message)).to include(match(/authentication/i)) }
    end
  end

  describe 'querying for just the user' do
    context 'when passed an id that belongs to a user' do
      let(:id) { user.id }

      specify { expect(data[:user][:id]).to eq(id) }
      specify { expect(errors).to be_nil }
    end

    context 'when passed an id that does not belong to a user' do
      let(:id) { (User.last&.id || 0) + 1000 }

      specify { expect(data[:user]).to be_nil }
      specify { expect(errors).to be_nil }
    end
  end

  describe 'querying for just the user and its relations' do
    subject(:query) do
      <<~GRAPHQL
        query {
          user(id: #{id}) {
            id
            company {
              id
            }
            shifts {
              id
            }
          }
        }
      GRAPHQL
    end

    let(:id) { user.id }
    let(:user_company) { user.company }
    let!(:user_shift) { user.shifts.create(attributes_for(:shift)) }

    before do
      create(:company)
      create(:user).tap do |other_user|
        other_user.shifts.create(attributes_for(:shift))
      end
    end

    specify { expect(data[:user][:id]).to eq(id) }
    specify { expect(errors).to be_nil }

    it 'gets the company that belongs to the user' do
      expect(data[:user][:company][:id]).to eq(user_company.id)
    end

    it 'includes only shifts that belong to the user' do
      expect(data[:user][:shifts].pluck(:id)).to contain_exactly(user_shift.id)
    end
  end
end
