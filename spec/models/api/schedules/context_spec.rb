# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Schedules::Context, type: :model do
  subject(:context) { described_class.new(after: after_time, before: before_time, user: user) }

  let(:user) { create(:user) }
  let(:after_time) { 1.day.ago }
  let(:before_time) { 1.day.from_now }

  describe "validations" do
    before { context.validate }

    context "when after is nil" do
      let(:after_time) { nil }
      let(:before_time) { 1.day.from_now }

      it "is not valid" do
        expect(context.errors.details.fetch(:after)).to include(error: :blank)
      end
    end

    context "when before is nil" do
      let(:after_time) { 1.day.ago }
      let(:before_time) { nil }

      it "is not valid" do
        expect(context.errors.details.fetch(:before)).to include(error: :blank)
      end
    end

    context "when after is not earlier than before" do
      let(:after_time) { 2.days.from_now }
      let(:before_time) { 1.day.from_now }

      it "is not valid" do
        expect(context.errors.details.fetch(:after)).to include(error: :must_be_earlier_than_before)
      end
    end

    context "when after and before are valid times" do
      let(:after_time) { 1.days.ago }
      let(:before_time) { 1.day.from_now }

      it "is valid" do
        expect(context).to be_valid
      end
    end
  end

  describe "#users" do
    before do
      create(:user)
      allow(Accounts::Users::LookupService).to receive(:viewable_by) { User.where(id: user.id) }
    end

    it "only includes users scoped by the lookup service" do
      expect(context.users).to contain_exactly(user)
    end
  end

  describe "#shifts" do
    let!(:shift) { create(:shift) }

    before do
      create(:shift)
      allow(Schedules::Shifts::LookupService).to receive(:viewable_by) { Shift.where(id: shift.id) }
    end

    it "only includes users scoped by the lookup service" do
      expect(context.shifts).to contain_exactly(shift)
    end

    context "when the shifts returned by the scope are outside of the window" do
      let(:after_time) { 1.day.from_now }
      let(:before_time) { 2.days.from_now }

      it "returns nothing" do
        expect(context.shifts).to be_empty
      end
    end
  end
end
