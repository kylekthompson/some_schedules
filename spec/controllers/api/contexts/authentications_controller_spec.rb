# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Contexts::AuthenticationsController, type: :request do
  include_context "with parsed body"

  describe "GET #show" do
    context "when unauthenticated" do
      before { get("/api/contexts/authentication") }

      it "is successful" do
        expect(response).to have_http_status(:ok)
      end

      it "does not have errors" do
        expect(parsed_body[:errors]).to be_nil
      end

      it "has the context" do
        expect(parsed_body[:context]).not_to be_nil
      end
    end

    context "when authenticated" do
      include_context "with authentication"

      before do
        sign_in
        get("/api/contexts/authentication")
      end

      it "is successful" do
        expect(response).to have_http_status(:ok)
      end

      it "does not have errors" do
        expect(parsed_body[:errors]).to be_nil
      end

      it "has the context" do
        expect(parsed_body[:context]).not_to be_nil
      end
    end
  end
end
