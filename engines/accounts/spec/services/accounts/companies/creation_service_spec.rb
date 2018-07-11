# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Companies::CreationService do
  describe ".create" do
    let(:result) { described_class.create(params) }
    let(:user) { create(:user) }
    let(:params) { attributes_for(:company, users: []).merge(user: user) }

    context "when the params are valid" do
      it "is successful" do
        expect(result).to be_success
      end

      it "sets up the company" do
        expect(result.company).to have_attributes(users: contain_exactly(user))
      end

      it "has no errors" do
        expect(result.errors).to be_blank
      end
    end

    context "when the params are invalid" do
      let(:params) { super().merge(name: nil) }

      it "is not successful" do
        expect(result).not_to be_success
      end

      it "has errors" do
        expect(result.errors).to be_present
      end
    end
  end
end
