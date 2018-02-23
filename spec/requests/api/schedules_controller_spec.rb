# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::SchedulesController, type: :request do
  include_context 'with parsed body'

  describe 'GET #context' do
    let(:params) { { after: 1.day.ago.to_s, before: 1.day.from_now.to_s } }

    context 'when unauthenticated' do
      before { get('/api/schedules/context', params: params) }

      it 'is not successful' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when authenticated' do
      include_context 'with authentication'

      before do
        sign_in
        get('/api/schedules/context', params: params)
      end

      it 'is successful' do
        expect(response).to have_http_status(:ok)
      end

      it 'does not have errors' do
        expect(parsed_body[:errors]).to be_nil
      end

      it 'has the context' do
        expect(parsed_body[:context][:users]).not_to be_nil
      end
    end
  end
end
