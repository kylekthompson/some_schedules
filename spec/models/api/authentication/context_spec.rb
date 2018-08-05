# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::Context, type: :model do
  subject(:context) { described_class.new(user: user) }

  describe "#is_signed_in" do
    context "when the user is nil" do
      let(:user) { nil }

      it "is false" do
        expect(context.is_signed_in).to eq(false)
      end
    end

    context "when the user is not nil" do
      let(:user) { build(:user) }

      it "is true" do
        expect(context.is_signed_in).to eq(true)
      end
    end
  end

  describe "#role" do
    context "when the user is nil" do
      let(:user) { nil }

      it "is nil" do
        expect(context.role).to be_nil
      end
    end

    context "when the user has a role" do
      let(:user) { build(:user, :owner) }

      it "is the user's role" do
        expect(context.role).to eq("owner")
      end
    end
  end
end
