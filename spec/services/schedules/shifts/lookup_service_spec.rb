# frozen_string_literal: true

require "rails_helper"

RSpec.describe Schedules::Shifts::LookupService do
  describe ".viewable_by" do
    let(:result) { described_class.viewable_by(user: user) }
    let!(:company) { create(:company, users: [user]) }

    context "when the user is not present" do
      let(:company) { create(:company, :with_users) }
      let(:user) { nil }

      before { create(:shift) }

      it "returns no shifts" do
        expect(result).to be_empty
      end
    end

    context "when the user is an employee" do
      let(:user) { create(:user, :employee) }
      let!(:published_shift) { create(:shift, user: user, published: true) }

      before do
        create(:shift, user: user, published: false)
        create(:shift, published: true)
      end

      it "returns the published shifts for that user" do
        expect(result).to contain_exactly(published_shift)
      end
    end

    shared_examples_for "a manager" do
      let(:other_user) { create(:user, :employee, company: company) }
      let!(:published_shift) { create(:shift, user: other_user, published: true) }
      let!(:unpublished_shift) { create(:shift, user: other_user, published: false) }

      before do
        create(:shift, published: false)
        create(:shift, published: true)
      end

      it "returns the shifts in the company of the user", :aggregate_failues do
        expect(result).to contain_exactly(published_shift, unpublished_shift)
      end
    end

    context "when the user is a manager" do
      it_behaves_like "a manager" do
        let(:user) { create(:user, :manager) }
      end
    end

    context "when the user is an owner" do
      it_behaves_like "a manager" do
        let(:user) { create(:user, :owner) }
      end
    end
  end
end
