# frozen_string_literal: true

require "rails_helper"

RSpec.describe Authentication::Tokens::EncodeService do
  describe ".encode" do
    let(:token) { described_class.encode(user: user) }

    context "when the user is not persisted" do
      let(:user) { User.new }

      it "does not build a token" do
        expect(token).to be_nil
      end
    end

    context "when the user is persisted" do
      let(:email) { "email@example.com" }
      let(:user) { instance_double(User, persisted?: true, email: email) }

      it "returns a valid token for that user", :aggregate_failures do
        expect(token).to be_present
        expect(Authentication::Tokens::DecodeService.decode(token: token).email).to eq(email)
      end
    end
  end
end
