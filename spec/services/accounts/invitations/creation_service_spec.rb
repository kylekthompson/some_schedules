# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Invitations::CreationService do
  describe ".create" do
    let(:invitation) { described_class.create(params) }
    let(:invited_by) { create(:user, :owner, :in_company) }
    let(:params) { { email: "email@example.com", invited_by: invited_by } }

    context "when the params are valid" do
      it "creates the invitation", :aggregate_failures do
        expect { invitation }.to change(Invitation, :count).by(1)
        expect(invitation).to have_attributes(
          invited_by: invited_by,
          email: "email@example.com",
        )
      end
    end

    context "when the inviter is not managerial" do
      let(:invited_by) { create(:user, :employee, :in_company) }

      it "raises" do
        expect { invitation }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end

    context "when the inviter is not in a company" do
      let(:invited_by) { create(:user, :owner, company: nil) }

      it "raises" do
        expect { invitation }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end
  end
end
