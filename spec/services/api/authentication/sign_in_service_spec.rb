# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::SignInService do
  describe ".sign_in" do
    let(:result) { described_class.sign_in(email: email, password: password) }

    context "when the email is nil" do
      let(:email) { nil }
      let(:password) { "password" }

      it "has no token" do
        expect(result.token).to be_nil
      end

      it "is not signed in" do
        expect(result.context.is_signed_in).to eq(false)
      end
    end

    context "when the password is nil" do
      let(:email) { "some@email.com" }
      let(:password) { nil }

      it "has no token" do
        expect(result.token).to be_nil
      end

      it "is not signed in" do
        expect(result.context.is_signed_in).to eq(false)
      end
    end

    context "when a user does not exist" do
      let(:email) { "some@email.com" }
      let(:password) { "password" }

      it "has no token" do
        expect(result.token).to be_nil
      end

      it "is not signed in" do
        expect(result.context.is_signed_in).to eq(false)
      end
    end

    context "when a user exists but the password is incorrect" do
      let!(:user) { create(:user, password: "password") }
      let(:email) { user.email }
      let(:password) { "incorrect-password" }

      it "has no token" do
        expect(result.token).to be_nil
      end

      it "is not signed in" do
        expect(result.context.is_signed_in).to eq(false)
      end
    end

    context "when a user exists and the password is correct" do
      let!(:user) { create(:user, password: password) }
      let(:email) { user.email }
      let(:password) { "password" }

      it "is signed in" do
        expect(result.context.is_signed_in).to eq(true)
      end

      it "has a valid token" do
        decoded_payload = Authentication::Tokens::DecodeService.decode(token: result.token)
        expect(decoded_payload.email).to eq(user.email)
      end
    end
  end
end
