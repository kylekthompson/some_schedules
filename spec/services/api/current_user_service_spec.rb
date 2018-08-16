# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::CurrentUserService do
  describe ".find" do
    let(:result) { described_class.find(token: token) }

    context "when there is no token" do
      let(:token) { nil }

      it "does not create another token" do
        expect(result.token).to be_nil
      end

      it "does not find a user" do
        expect(result.user).to be_nil
      end
    end

    context "when there is a token" do
      let(:user) { create(:user) }
      let(:token) { ::Authentication::Tokens::EncodeService.encode(user: user) }

      it "creates another token" do
        decoded_payload = ::Authentication::Tokens::DecodeService.decode(token: result.token)
        expect(decoded_payload.email).to eq(user.email)
      end

      it "finds a user" do
        expect(result.user).to eq(user)
      end
    end
  end
end
