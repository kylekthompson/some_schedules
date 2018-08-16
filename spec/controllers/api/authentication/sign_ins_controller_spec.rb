# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::SignInsController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "POST #create" do
    let(:params) { { authentication: { email: email, password: password } } }

    before { post("/api/authentication/sign_in", params: params, headers: headers) }

    context "when the credentials are correct" do
      let!(:user) { create(:user, password: "password") }
      let(:email) { user.email }
      let(:password) { user.password }

      it "is successful", :aggregate_failures do
        expect(response).to have_http_status(:ok)
        expect(parsed_body[:context][:role]).to eq(user.role)
      end

      it "is signed in for future requests" do
        get("/api/contexts/authentication", headers: headers)
        expect(parsed_body[:context][:is_signed_in]).to eq(true)
      end
    end

    context "when the credentials are incorrect" do
      let(:email) { "some@email.com" }
      let(:password) { "password" }

      it "renders unauthorized", :aggregate_failures do
        expect(response).to have_http_status(:unauthorized)
        expect(parsed_body[:context][:is_signed_in]).to eq(false)
      end
    end
  end
end
