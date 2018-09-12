# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::MesController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "GET #show" do
    context "when unauthenticated" do
      before { get("/api/me", headers: headers) }

      it "is successful" do
        expect(response).to have_http_status(:ok)
      end

      it "is nil" do
        expect(parsed_body[:me]).to be_nil
      end
    end

    context "when authenticated" do
      include_context "with authentication"

      before do
        sign_in
        get("/api/me", headers: headers)
      end

      it "is successful" do
        expect(response).to have_http_status(:ok)
      end

      it "is the current user" do
        expect(parsed_body[:me]).to be_present
      end
    end
  end
end
