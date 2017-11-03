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

  let(:result) do
    SomeSchedulesSchema.execute(
      query,
      variables: variables,
      context: context
    ).with_indifferent_access[:data]
  end
  let(:variables) { {} }
  let(:context) { { current_user: current_user } }
  let(:current_user) { create(:user) }
  let(:user) { create(:user) }

  context 'when there is a current user' do
    let(:id) { user.id }

    specify { expect(result[:user][:id]).to eq(id) }

    context 'but there is no user for the provided id' do
      let(:id) { (User.last&.id || 0) + 1000 }

      specify { expect(result[:user]).to be_nil }
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }
    let(:id) { user.id }

    specify { expect(result[:user]).to be_nil }
  end
end
