# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::GraphqlController, type: :request do
  describe 'POST #execute' do
    let(:user) { create(:user) }
    let(:headers) { authenticated_headers(user: user) }
    let(:query) do
      <<~QUERY
        query {
          user(id: #{user.id}) {
            id
            shifts {
              id
            }
            company {
              id
            }
          }
          company(slug: "#{user.company.slug}") {
            id
            shifts {
              id
            }
            users {
              id
            }
          }
        }
      QUERY
    end
    let(:request) do
      post('/api/v1/graphql', params: { query: query }.to_json, headers: headers)
    end
    let(:response_body) { JSON.parse(response.body).with_indifferent_access }

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

    it 'does not have errors' do
      request
      expect(response_body[:errors]).to be_nil
    end

    it 'has the results' do
      request
      expect(response_body[:data][:user]).not_to be_nil
    end
  end
end
