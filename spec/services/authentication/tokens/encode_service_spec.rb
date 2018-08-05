# frozen_string_literal: true

require "rails_helper"

RSpec.describe Authentication::Tokens::EncodeService do
  describe ".encode" do
    let(:result) { described_class.encode(user: user) }

    context "when the user is not persisted" do
      let(:user) { User.new }

      it "is not successful" do
        expect(result).not_to be_success
      end
    end

    context "when the user is passed" do
      let(:email) { "email@example.com" }
      let(:user) { instance_double(User, persisted?: true, email: email) }
      let(:decode) { Authentication::Tokens::DecodeService.decode(token: result.token) }

      it "is successful" do
        expect(result).to be_success
      end

      it "returns a valid token for that user" do
        expect(decode).to be_success
      end
    end
  end
end
