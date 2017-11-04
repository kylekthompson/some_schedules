# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'query { viewer }' do
  subject(:query) do
    <<~GRAPHQL
      query {
        viewer {
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
  let(:current_user) { nil }

  context 'when there is a current user' do
    let(:current_user) { create(:user) }

    specify { expect(result[:viewer][:id]).to eq(current_user.id) }
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect(result[:viewer]).to be_nil }
  end
end
