# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::Authentication::SignUpsController, type: :request do
  include_context 'with parsed body'

  describe 'POST #create' do
    let(:params) { { authentication: { company: company, user: user } } }

    before { post('/api/authentication/sign_up', params: params) }

    context 'when there are problems with the input' do
      let(:company) { attributes_for(:company).except(:name) }
      let(:user) { attributes_for(:user).except(:admin, :role) }

      it 'renders unprocessable entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'has an error' do
        expect(parsed_body[:errors][:company][:name]).not_to be_empty
      end
    end

    context 'when the input is valid' do
      let(:company) { attributes_for(:company) }
      let(:user) { attributes_for(:user).except(:admin, :role) }

      it 'renders created' do
        expect(response).to have_http_status(:created)
      end

      it 'has the authentication context' do
        expect(parsed_body[:context][:is_signed_in]).to eq(true)
      end

      it 'is signed in for future requests' do
        get('/api/contexts/authentication')
        expect(parsed_body[:context][:is_signed_in]).to eq(true)
      end
    end
  end
end
