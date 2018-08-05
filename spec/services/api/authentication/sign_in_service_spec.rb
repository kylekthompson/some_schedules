# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::SignInService do
  describe ".sign_in" do
    let(:result) { described_class.sign_in(email: email, password: password) }
    let(:serialized) { result.serialize }

    context "when the email is nil" do
      let(:email) { nil }
      let(:password) { "password" }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unauthorized)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors)).to include(:email)
      end
    end

    context "when the password is nil" do
      let(:email) { "some@email.com" }
      let(:password) { nil }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unauthorized)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors)).to include(:password)
      end
    end

    context "when a user does not exist" do
      let(:email) { "some@email.com" }
      let(:password) { "password" }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unauthorized)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors)).to include(:user)
      end
    end

    context "when a user exists but the password is incorrect" do
      let!(:user) { create(:user, password: "password") }
      let(:email) { user.email }
      let(:password) { "incorrect-password" }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unauthorized)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors)).to include(:user)
      end
    end

    context "when a user exists and the password is correct" do
      let!(:user) { create(:user, password: password) }
      let(:email) { user.email }
      let(:password) { "password" }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:ok)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:context).keys.count).to eq(2)
        expect(serialized.fetch(:context)).to include(
          is_signed_in: true,
          role: user.role,
        )
      end

      it "has a valid token" do
        decode_result = Authentication::Tokens::DecodeService.decode(token: result.token)
        expect(decode_result.email).to eq(user.email)
      end
    end
  end
end
