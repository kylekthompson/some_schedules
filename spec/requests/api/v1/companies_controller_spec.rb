# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CompaniesController, type: :request do
  describe 'POST #create' do
    let(:user) { create(:user) }
    let(:company_params) { attributes_for(:company) }
    let(:request) do
      post('/api/v1/companies', params: { company: company_params }.to_json, headers: headers)
    end

    context 'when authenticated' do
      let(:headers) { authenticated_headers(user: user) }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:created)
      end

      it 'creates a company' do
        expect { request }.to(change { Company.count }.by(1))
      end
    end

    context 'when unauthenticated' do
      let(:headers) { unauthenticated_headers }

      it 'has the right status' do
        request
        expect(response).to have_http_status(:unauthorized)
      end

      it 'does not create a company' do
        expect { request }.not_to(change { Company.count })
      end
    end
  end
end
