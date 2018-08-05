# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::ContextService do
  describe ".build" do
    let(:result) { described_class.build(user: user) }
    let(:serialized) { result.serialize }

    context "when the user is nil" do
      let(:user) { nil }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:ok)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:context).keys.count).to eq(2)
        expect(serialized.fetch(:context)).to include(
          is_signed_in: false,
          role: nil,
        )
      end
    end

    context "when the user is not nil" do
      let(:user) { build(:user) }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:ok)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:context).keys.count).to eq(2)
        expect(serialized.fetch(:context)).to include(
          is_signed_in: true,
          role: user.role,
        )
      end
    end
  end
end
