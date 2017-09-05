# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::GraphqlController, type: :request do
  describe 'POST #execute' do
    let(:headers) { unauthenticated_headers }
    let(:user) { create(:user) }
    let(:query) do
      <<~QUERY
        query {
          user(id: #{user.id}) {
            id
          }
        }
      QUERY
    end
    let(:request) do
      post('/api/v1/graphql', params: { query: query }.to_json, headers: headers)
    end

    before do
      allow(SomeSchedulesSchema).to receive(:execute).and_call_original
    end

    it 'executes' do
      request
      expect(SomeSchedulesSchema).to have_received(:execute)
    end

    it 'returns OK' do
      request
      expect(response).to have_http_status(:ok)
    end
  end
end
