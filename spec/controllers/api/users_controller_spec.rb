# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::UsersController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "POST #create" do
    let(:params) { { user: user } }
    let(:user) { attributes_for(:user) }

    context "when unauthenticated" do
      before { post("/api/users", params: params, headers: headers) }

      it "is successful", :aggregate_failures do
        expect(response).to have_http_status(:created)
        expect(parsed_body[:errors]).to be_nil
        expect(parsed_body[:user][:name]).to eq(user[:name])
        expect(User.last.role).to eq(User::Role::OWNER)
      end

      it "is signed in for future requests" do
        get("/api/me", headers: headers)
        expect(parsed_body[:me]).to be_present
      end
    end

    context "when authenticated" do
      include_context "with authentication"

      let(:current_user) { create(:user) }

      before do
        sign_in
        post("/api/users", params: params, headers: headers)
      end

      it "is forbidden" do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
