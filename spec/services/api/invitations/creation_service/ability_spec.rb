# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Invitations::CreationService::Ability do
  subject(:ability) { described_class.new(current_user: user) }

  describe ".can_create?" do
    context "when the user is an employee" do
      let(:user) { create(:user, :employee) }

      it "cannot create" do
        expect(ability.can_create?).to eq(false)
      end
    end

    context "when the user is a manager" do
      let(:user) { create(:user, :manager) }

      it "can create" do
        expect(ability.can_create?).to eq(true)
      end
    end

    context "when the user is a owner" do
      let(:user) { create(:user, :owner) }

      it "can create" do
        expect(ability.can_create?).to eq(true)
      end
    end
  end
end
