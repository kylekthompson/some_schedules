# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Users::CreationService::Ability do
  subject(:ability) { described_class.new(current_user: current_user) }

  describe ".can_create?" do
    context "when there is no current user" do
      let(:current_user) { nil }

      it "can create" do
        expect(ability.can_create?).to eq(true)
      end
    end

    context "when there is a current user" do
      let(:current_user) { create(:user) }

      it "cannot create" do
        expect(ability.can_create?).to eq(false)
      end
    end
  end
end
