# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'query { user }' do
  subject(:query) do
    <<~GRAPHQL
      query User($id: Int!) {
        user(id: $id) {
          id
        }
      }
    GRAPHQL
  end

  let(:variables) { { id: id } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { user_one }

  include_context 'data_setup'
  include_context 'query_execution_setup'

  describe 'authentication' do
    let(:id) { user_one.id }

    include_context 'stub_policies'

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

  describe 'authorization' do
    context 'when trying to view a user within my company' do
      let(:id) { user_one.id }

      specify { expect(data[:user][:id]).to eq(id) }
    end

    context 'when trying to view a user outside of my company' do
      let(:id) { user_two.id }

      specify { expect(data[:user]).to be_nil }
    end
  end

  describe 'querying for just the user' do
    include_context 'stub_policies'

    context 'when passed an id that belongs to a user' do
      let(:id) { user_one.id }

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
        query User($id: Int!) {
          user(id: $id) {
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

    let(:id) { user_one.id }
    let(:create_user_one) { true }
    let(:create_user_two) { true }
    let(:user_one_shift_count) { 1 }
    let(:user_two_shift_count) { 1 }

    include_context 'stub_policies'

    specify { expect(data[:user][:id]).to eq(id) }
    specify { expect(errors).to be_nil }

    it 'gets the company that belongs to the user' do
      expect(data[:user][:company][:id]).to eq(user_one.company.id)
    end

    it 'includes only shifts that belong to the user' do
      expect(data[:user][:shifts].pluck(:id)).to contain_exactly(user_one.shifts.first.id)
    end
  end
end
