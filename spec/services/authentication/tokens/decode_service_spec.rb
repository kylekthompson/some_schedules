# frozen_string_literal: true

require "rails_helper"

RSpec.describe Authentication::Tokens::DecodeService do
  describe ".decode" do
    let(:decoded_payload) { described_class.decode(token: token) }

    context "when the token is nil" do
      let(:token) { nil }

      it "is not successful" do
        expect(decoded_payload).to be_nil
      end
    end

    context "when the token is not properly signed" do
      let(:token) { JWT.encode({ email: "email@example.com" }, "some_secret", Authentication::Tokens::ALGORITHM) }

      it "is not successful" do
        expect(decoded_payload.email).to be_nil
      end
    end

    context "when the token is valid" do
      let(:email) { "email@example.com" }
      let(:user) { instance_double(User, persisted?: true, email: email) }
      let(:token) { Authentication::Tokens::EncodeService.encode(user: user) }

      it "properly decodes" do
        expect(decoded_payload.email).to eq(email)
      end
    end
  end
end
