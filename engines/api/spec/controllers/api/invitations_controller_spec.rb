# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::InvitationsController, type: :request do
  include_context 'with parsed body'

  describe 'POST #create' do
    let(:params) { { invitation: { email: email } } }
    let(:email) { 'some@email.com' }

    context 'when unauthenticated' do
      before { post('/api/invitations', params: params) }

      it 'is not successful' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when authenticated as an owner' do
      include_context 'with authentication'

      let(:current_user) { create(:user, :owner) }

      before do
        sign_in
        post('/api/invitations', params: params)
      end

      it 'is successful' do
        expect(response).to have_http_status(:created)
      end

      it 'does not have errors', :aggregate_failures do
        expect(parsed_body[:error]).to be_nil
        expect(parsed_body[:errors]).to be_nil
      end

      it 'has the invitation' do
        expect(parsed_body[:invitation][:email]).to eq(email)
      end
    end

    context 'when authenticated as an employee' do
      include_context 'with authentication'

      let(:current_user) { create(:user, :employee) }

      before do
        sign_in
        post('/api/invitations', params: params)
      end

      it 'is not successful' do
        expect(response).to have_http_status(:forbidden)
      end

      it 'has the error' do
        expect(parsed_body[:error]).not_to be_nil
      end

      it 'does not invite the email' do
        expect(parsed_body[:invitation]).to be_nil
      end
    end
  end
end
