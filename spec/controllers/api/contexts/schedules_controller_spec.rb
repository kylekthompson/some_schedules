# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Contexts::SchedulesController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "GET #show" do
    let(:params) { { after: 1.day.ago.to_s, before: 1.day.from_now.to_s } }

    context "when unauthenticated" do
      before { get("/api/contexts/schedule", params: params, headers: headers) }

      it "is not successful" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated" do
      include_context "with authentication"

      before do
        sign_in
        get("/api/contexts/schedule", params: params, headers: headers)
      end

      it "is successful" do
        expect(response).to have_http_status(:ok)
      end

      it "does not have errors" do
        expect(parsed_body[:errors]).to be_nil
      end

      it "has the context" do
        expect(parsed_body[:context][:users]).not_to be_nil
      end
    end
  end
end
