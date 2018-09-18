# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::InvitationsController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "POST #create" do
    let(:params) { { invitation: { email: email, role: role } } }
    let(:role) { User::Role::EMPLOYEE }
    let(:email) { "some@email.com" }

    context "when unauthenticated" do
      before { post("/api/invitations", params: params, headers: headers) }

      it "is unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated as an owner" do
      include_context "with authentication"

      let(:current_user) { create(:user, :owner, :in_company) }

      before do
        sign_in
        post("/api/invitations", params: params, headers: headers)
      end

      it "is successful", :aggregate_failures do
        expect(response).to have_http_status(:created)
        expect(parsed_body[:errors]).to be_nil
        expect(parsed_body[:invitation][:email]).to eq(email)
        expect(parsed_body[:invitation][:role]).to eq(role)
      end
    end

    context "when authenticated as an employee" do
      include_context "with authentication"

      let(:current_user) { create(:user, :employee) }

      before do
        sign_in
        post("/api/invitations", params: params, headers: headers)
      end

      it "is forbidden" do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
