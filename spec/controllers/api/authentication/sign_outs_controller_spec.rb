# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::SignOutsController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "POST #create" do
    include_context "with authentication"

    before do
      sign_in
      post("/api/authentication/sign_out", headers: headers)
    end

    it "renders no content" do
      expect(response).to have_http_status(:no_content)
    end

    it "signs out" do
      get("/api/contexts/authentication", headers: headers)
      expect(parsed_body[:context][:is_signed_in]).to eq(false)
    end
  end
end
