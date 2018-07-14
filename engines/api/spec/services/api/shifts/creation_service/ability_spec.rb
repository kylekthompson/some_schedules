# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Shifts::CreationService::Ability do
  subject(:ability) { described_class.new(current_user: current_user) }

  describe ".can_create?" do
    context "when the current user is an employee" do
      let(:current_user) { create(:user, :in_company, :employee) }
      let(:user) { create(:user) }

      it "cannot create" do
        expect(ability.can_create?(user: user)).to eq(false)
      end
    end

    shared_examples_for "a managerial user" do
      context "when creating a shift for a user in a different company" do
        let(:user) { create(:user, :in_company) }

        it "cannot create", :aggregate_failures do
          expect(user.company).not_to eq(current_user.company)
          expect(ability.can_create?(user: user)).to eq(false)
        end
      end

      context "when creating a shift for a user in the same company" do
        let(:user) { create(:user, company: current_user.company) }

        it "can create", :aggregate_failures do
          expect(user.company).to eq(current_user.company)
          expect(ability.can_create?(user: user)).to eq(true)
        end
      end
    end

    context "when the user is a manager" do
      it_behaves_like "a managerial user" do
        let(:current_user) { create(:user, :in_company, :manager) }
      end
    end

    context "when the user is a owner" do
      it_behaves_like "a managerial user" do
        let(:current_user) { create(:user, :in_company, :owner) }
      end
    end
  end
end
