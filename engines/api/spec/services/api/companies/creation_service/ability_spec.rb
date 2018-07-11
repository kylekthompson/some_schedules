# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Companies::CreationService::Ability do
  subject(:ability) { described_class.new(current_user: user) }

  describe ".can_create?" do
    context "when the user is part of a company" do
      let(:user) { create(:user, :in_company) }

      it "cannot create" do
        expect(ability.can_create?).to eq(false)
      end
    end

    context "when the user is not an owner" do
      let(:user) { create(:user, :employee) }

      it "cannot create" do
        expect(ability.can_create?).to eq(false)
      end
    end

    context "when the user is an owner and not part of a company" do
      let(:user) { create(:user, :owner) }

      it "cannot create" do
        expect(ability.can_create?).to eq(true)
      end
    end
  end
end
