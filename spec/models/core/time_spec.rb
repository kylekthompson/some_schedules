# frozen_string_literal: true

require "rails_helper"

RSpec.describe Core::Time, type: :model do
  subject(:time) { described_class.new(raw_time) }

  let(:raw_time) { ::Time.current }

  it "responds to normal time methods" do
    ::Time.instance_methods(false).each do |method|
      expect(time).to respond_to(method)
    end
  end

  describe "#blank?" do
    context "when the raw time is a regular time" do
      let(:raw_time) { ::Time.current }

      it "returns false" do
        expect(time.blank?).to eq(false)
      end
    end

    context "when the raw time is parseable" do
      let(:raw_time) { ::Time.current.to_s }

      it "returns false" do
        expect(time.blank?).to eq(false)
      end
    end

    context "when the raw time is not parseable" do
      let(:raw_time) { nil }

      it "returns true" do
        expect(time.blank?).to eq(true)
      end
    end
  end

  describe "#present?" do
    context "when the raw time is a regular time" do
      let(:raw_time) { ::Time.current }

      it "returns true" do
        expect(time.present?).to eq(true)
      end
    end

    context "when the raw time is parseable" do
      let(:raw_time) { ::Time.current.to_s }

      it "returns true" do
        expect(time.present?).to eq(true)
      end
    end

    context "when the raw time is not parseable" do
      let(:raw_time) { nil }

      it "returns false" do
        expect(time.present?).to eq(false)
      end
    end
  end

  describe "#presence" do
    context "when the raw time is a regular time" do
      let(:raw_time) { ::Time.current }

      it "is truthy" do
        expect(time.presence).to be_truthy
      end
    end

    context "when the raw time is parseable" do
      let(:raw_time) { ::Time.current.to_s }

      it "is truthy" do
        expect(time.presence).to be_truthy
      end
    end

    context "when the raw time is not parseable" do
      let(:raw_time) { nil }

      it "is falsey" do
        expect(time.presence).to be_falsey
      end
    end
  end
end
