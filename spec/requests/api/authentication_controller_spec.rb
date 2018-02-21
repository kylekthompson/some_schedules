# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::AuthenticationController, type: :request do
  include_context 'with parsed body'

  describe 'GET #context' do
    context 'when unauthenticated' do
      before { get('/api/authentication/context') }

      it 'is successful' do
        expect(response).to have_http_status(:ok)
      end

      it 'does not have errors' do
        expect(parsed_body[:errors]).to be_nil
      end

      it 'has the context' do
        expect(parsed_body[:context]).not_to be_nil
      end
    end

    context 'when authenticated' do
      include_context 'with authentication'

      before do
        sign_in
        get('/api/authentication/context')
      end

      it 'is successful' do
        expect(response).to have_http_status(:ok)
      end

      it 'does not have errors' do
        expect(parsed_body[:errors]).to be_nil
      end

      it 'has the context' do
        expect(parsed_body[:context]).not_to be_nil
      end
    end
  end

  describe 'POST #sign_in' do
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
        get('/api/authentication/context')
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

  describe 'POST #sign_out' do
    include_context 'with authentication'

    before do
      sign_in
      post('/api/authentication/sign_out')
    end

    it 'renders no content' do
      expect(response).to have_http_status(:no_content)
    end

    it 'signs out' do
      get('/api/authentication/context')
      expect(parsed_body[:context][:is_signed_in]).to eq(false)
    end
  end
end
