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

  let(:variables) { {} }
  let(:context) { { current_user: current_user } }
  let(:current_user) { user_one }

  include_context 'with data setup'
  include_context 'with query execution setup'

  context 'when there is a current user' do
    let(:current_user) { user_one }

    specify { expect(data[:viewer][:id]).to eq(current_user.id) }
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect(data[:viewer]).to be_nil }
  end
end
