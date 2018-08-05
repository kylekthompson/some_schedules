# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Schedules::ContextService do
  describe ".build" do
    let(:result) { described_class.build(user: user, after: after, before: before) }
    let(:user) { create(:user, :in_company) }
    let(:serialized) { result.serialize }

    context "when before is nil" do
      let(:after) { 1.day.ago.to_s }
      let(:before) { nil }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unprocessable_entity)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors).keys.count).to eq(1)
        expect(serialized.fetch(:errors).details.fetch(:before)).to include(error: :blank)
      end
    end

    context "when after is nil" do
      let(:after) { nil }
      let(:before) { 1.day.from_now.to_s }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unprocessable_entity)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors).keys.count).to eq(1)
        expect(serialized.fetch(:errors).details.fetch(:after)).to include(error: :blank)
      end
    end

    context "when after is not earlier than before" do
      let(:after) { 2.days.from_now.to_s }
      let(:before) { 1.day.from_now.to_s }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unprocessable_entity)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors).keys.count).to eq(1)
        expect(serialized.fetch(:errors).details.fetch(:after)).to include(error: :must_be_earlier_than_before)
      end
    end

    context "when after or before is not a valid time string" do
      let(:after) { "not a time" }
      let(:before) { 1.day.from_now.to_s }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:unprocessable_entity)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:errors).keys.count).to eq(1)
        expect(serialized.fetch(:errors).details.fetch(:after)).to include(error: :blank)
      end
    end

    context "when after and before are valid time strings" do
      let(:after) { 1.days.ago.to_s }
      let(:before) { 1.day.from_now.to_s }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:ok)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:context).keys.count).to eq(2)
        expect(serialized.fetch(:context)).to include(
          users: be_a(Array),
          shifts: be_a(Array),
        )
      end
    end

    context "when after and before are valid times" do
      let(:after) { 1.days.ago }
      let(:before) { 1.day.from_now }

      it "serializes properly", :aggregate_failures do
        expect(result.status).to eq(:ok)
        expect(serialized.keys.count).to eq(1)
        expect(serialized.fetch(:context).keys.count).to eq(2)
        expect(serialized.fetch(:context)).to include(
          users: be_a(Array),
          shifts: be_a(Array),
        )
      end
    end
  end
end
