# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::Authentication::SignInsController, type: :request do
  include_context 'with parsed body'

  describe 'POST #create' do
    let(:params) { { authentication: { email: email, password: password } } }

    before { post('/api/authentication/sign_in', params: params) }

    context 'when the credentials are correct' do
      let!(:user) { create(:user, password: 'password') }
      let(:email) { user.email }
      let(:password) { user.password }

      it 'renders ok' do
        expect(response).to have_http_status(:ok)
      end

      it 'has the context' do
        expect(parsed_body[:context][:role]).to eq(user.role)
      end

      it 'is signed in for future requests' do
        get('/api/contexts/authentication')
        expect(parsed_body[:context][:is_signed_in]).to eq(true)
      end
    end

    context 'when the credentials are incorrect' do
      let(:email) { 'some@email.com' }
      let(:password) { 'password' }

      it 'renders not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'has the correct error' do
        expected_error = I18n.t!('services.authentication.sign_in.not_found')
        expect(parsed_body[:error]).to eq(expected_error)
      end
    end
  end
end
