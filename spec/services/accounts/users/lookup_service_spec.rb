# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Users::LookupService do
  describe ".by" do
    let(:result) { described_class.by(email: email) }

    context "when the user exists" do
      let(:user) { create(:user) }
      let(:email) { user.email }

      it "returns the user" do
        expect(result).to eq(user)
      end
    end

    context "when the user does not exist" do
      let(:email) { build(:user).email }

      it "returns a nil user" do
        expect(result).to be_a(NilUser)
      end
    end
  end

  describe ".viewable_by" do
    let(:result) { described_class.viewable_by(user: user) }

    context "when the user is not present" do
      let(:user) { nil }

      before { create(:user) }

      it "returns no users" do
        expect(result).to be_empty
      end
    end

    context "when the user is an employee" do
      let(:user) { create(:user, :employee) }

      before { create(:user) }

      it "returns the user" do
        expect(result).to contain_exactly(user)
      end
    end

    shared_examples_for "a manager" do
      let(:company) { create(:company, :with_users) }

      before { create(:user) }

      it "returns the users in the company of the user", :aggregate_failues do
        expect(result).to contain_exactly(*company.reload.users)
      end
    end

    context "when the user is a manager" do
      it_behaves_like "a manager" do
        let(:user) { create(:user, :manager, company: company) }
      end
    end

    context "when the user is an owner" do
      it_behaves_like "a manager" do
        let(:user) { create(:user, :owner, company: company) }
      end
    end
  end
end
