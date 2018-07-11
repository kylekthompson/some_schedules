# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Invitations::CreationService do
  describe ".create" do
    let(:result) { described_class.create(invited_by: invited_by, email: email) }

    context "when the params are valid" do
      let(:invited_by) { create(:user) }
      let(:email) { "some@email.com" }

      it "is successful" do
        expect(result).to be_success
      end

      it "builds the invitation" do
        expect(result.invitation).to have_attributes(invited_by: invited_by)
      end

      it "does not have errors" do
        expect(result.errors).to be_blank
      end
    end

    context "when there is no invited_by" do
      let(:invited_by) { nil }
      let(:email) { "some@email.com" }

      it "is not successful" do
        expect(result).not_to be_success
      end

      it "has errors" do
        expect(result.errors).to be_present
      end
    end
  end
end
