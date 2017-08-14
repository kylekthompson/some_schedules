# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UserTokenController, type: :request do
  describe 'POST #create' do
    let(:request) do
      post(
        '/api/v1/sign_in',
        params: { auth: auth_params }.to_json,
        headers: unauthenticated_headers
      )
    end

    context 'when passed invalid params' do
      let(:auth_params) { { email: 'test@example.com', password: 'password' } }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when passed valid params' do
      let(:user) { create(:user, password: 'password') }
      let(:auth_params) { { email: user.email, password: 'password' } }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:success)
      end

      it 'returns a token' do
        request
        expect(JSON.parse(response.body)['value']['token']).not_to be_nil
      end
    end
  end
end
