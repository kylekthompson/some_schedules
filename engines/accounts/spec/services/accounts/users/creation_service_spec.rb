# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Users::CreationService do
  describe ".create" do
    let(:result) { described_class.create(params) }
    let(:params) { attributes_for(:user) }

    context "when the params are valid" do
      it "is successful" do
        expect(result).to be_success
      end

      it "has no errors" do
        expect(result.errors).to be_blank
      end
    end

    context "when the params are invalid" do
      let(:params) { super().merge(first_name: nil) }

      it "is not successful" do
        expect(result).not_to be_success
      end

      it "has errors" do
        expect(result.errors).to be_present
      end
    end
  end
end
