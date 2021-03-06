# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::ShiftsController, type: :request do
  include_context "with headers"
  include_context "with parsed body"

  describe "POST #create" do
    let!(:user_for_shift) { create(:user) }
    let(:params) { { shift: shift_params } }
    let(:shift_params) { attributes_for(:shift) }

    context "when unauthenticated" do
      before { post("/api/users/#{user_for_shift.id}/shifts", params: params, headers: headers) }

      it "is not successful" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when authenticated as a user with permission to create a shift" do
      include_context "with authentication"

      let(:current_user) { create(:user, :in_company, :owner) }
      let(:user_for_shift) { create(:user, company: current_user.company) }

      before do
        sign_in
        post("/api/users/#{user_for_shift.id}/shifts", params: params, headers: headers)
      end

      context "when the params are valid" do
        let(:shift_params) { attributes_for(:shift) }

        it "is successful", :aggregate_failures do
          expect(response).to have_http_status(:created)
          expect(parsed_body[:errors]).to be_nil
          expect(parsed_body[:shift][:user][:id]).to eq(user_for_shift.id)
        end
      end

      context "when the params are invalid" do
        let(:shift_params) { attributes_for(:shift).except(:end_time) }

        it "is not successful", :aggregate_failures do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(parsed_body[:errors][:end_time]).not_to be_empty
        end
      end
    end

    context "when authenticated as a user without permission to create a shift with the passed params" do
      include_context "with authentication"

      before do
        sign_in
        post("/api/users/#{user_for_shift.id}/shifts", params: params, headers: headers)
      end

      it "is not successful" do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
