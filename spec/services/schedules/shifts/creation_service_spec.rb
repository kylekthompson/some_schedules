# frozen_string_literal: true

require "rails_helper"

RSpec.describe Schedules::Shifts::CreationService do
  describe ".create" do
    let(:result) { described_class.create(params) }
    let(:user) { create(:user) }
    let(:params) { attributes_for(:shift).merge(user: user) }

    context "when the params are valid" do
      it "is successful" do
        expect(result).to be_success
      end

      it "sets up the shift" do
        expect(result.shift).to have_attributes(user: user)
      end

      it "has no errors" do
        expect(result.errors).to be_blank
      end
    end

    context "when the params are invalid" do
      let(:user) { nil }

      it "is not successful" do
        expect(result).not_to be_success
      end

      it "has errors" do
        expect(result.errors).to be_present
      end
    end
  end
end
