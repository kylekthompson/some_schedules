# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Schedules::ContextService do
  describe ".build" do
    let(:context) { described_class.build(user: user, after: after_time, before: before_time) }
    let(:user) { create(:user, :in_company) }

    context "when the times are valid time strings" do
      let(:after_time) { 1.day.ago.to_s }
      let(:before_time) { 1.day.from_now.to_s }

      it "is valid" do
        expect(context).to be_valid
      end
    end

    context "when the times are invalid time strings" do
      let(:after_time) { "not valid" }
      let(:before_time) { "not valid" }

      it "is not valid" do
        expect(context).not_to be_valid
      end
    end

    context "when the times are regular times" do
      let(:after_time) { 1.day.ago }
      let(:before_time) { 1.day.from_now }

      it "is valid" do
        expect(context).to be_valid
      end
    end
  end
end
