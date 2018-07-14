# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::CompaniesController, type: :request do
  include_context "with parsed body"

  describe "POST #create" do
    let(:params) { { company: company } }
    let(:company) { attributes_for(:company) }

    context "when unauthenticated" do
      before { post("/api/companies", params: params) }

      it "is unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated as an owner" do
      include_context "with authentication"

      let(:current_user) { create(:user, :owner) }

      before do
        sign_in
        post("/api/companies", params: params)
      end

      it "is successful", :aggregate_failures do
        expect(response).to have_http_status(:created)
        expect(parsed_body[:errors]).to be_nil
        expect(parsed_body[:company][:name]).to eq(company[:name])
      end
    end

    context "when authenticated as a manager" do
      include_context "with authentication"

      let(:current_user) { create(:user, :manager) }

      before do
        sign_in
        post("/api/companies", params: params)
      end

      it "is forbidden" do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context "when authenticated as an employee" do
      include_context "with authentication"

      let(:current_user) { create(:user, :employee) }

      before do
        sign_in
        post("/api/companies", params: params)
      end

      it "is forbidden" do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
