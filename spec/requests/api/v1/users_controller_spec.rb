# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  describe 'GET #show' do
    let(:user) { create(:user) }
    let(:request) do
      get("/api/v1/users/#{user.id}", headers: headers)
    end

    context 'when the request is authenticated' do
      let(:headers) { authenticated_headers }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the request is not authenticated' do
      let(:headers) { unauthenticated_headers }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST #create' do
    let(:request) do
      post('/api/v1/users', params: { user: user_params }.to_json, headers: unauthenticated_headers)
    end

    context 'when passed invalid params' do
      let(:user_params) { { first_name: nil } }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'does not create a user' do
        expect {
          request
        }.not_to(change { User.count })
      end
    end

    context 'when passed valid params' do
      let(:user_params) { attributes_for(:user) }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:created)
      end

      it 'creates a user' do
        expect {
          request
        }.to(change { User.count }.by(1))
      end
    end
  end
end
