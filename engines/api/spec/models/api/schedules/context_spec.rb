# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Schedules::Context, type: :model do
  subject(:context) { described_class.new(after: after, before: before, user: user) }

  let(:user) { create(:user) }
  let(:after) { 1.day.ago }
  let(:before) { 1.day.from_now }

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
      let(:after) { 1.day.from_now }
      let(:before) { 2.days.from_now }

      it "returns nothing" do
        expect(context.shifts).to be_empty
      end
    end
  end
end
