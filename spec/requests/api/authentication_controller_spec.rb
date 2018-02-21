# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::AuthenticationController, type: :request do
  include_context 'with parsed body'

  describe 'GET #context' do
    before { get('/api/authentication/context', headers: headers) }

    context 'when unauthenticated' do
      include_context 'with unauthenticated headers'

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
      include_context 'with authenticated headers'

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
end
