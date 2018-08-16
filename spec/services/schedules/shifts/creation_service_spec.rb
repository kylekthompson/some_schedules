# frozen_string_literal: true

require "rails_helper"

RSpec.describe Schedules::Shifts::CreationService do
  describe ".create" do
    let(:shift) { described_class.create(params) }
    let(:params) { attributes_for(:shift).merge(user: user, current_user: current_user) }

    context "when the current user is not managerial" do
      let(:user) { create(:user, :employee, :in_company) }
      let(:current_user) { create(:user, :employee, :in_company) }

      it "raises" do
        expect { shift }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end

    context "when the current user is in a different company than the shift's user" do
      let(:user) { create(:user, :employee, :in_company) }
      let(:current_user) { create(:user, :owner, :in_company) }

      it "raises" do
        expect { shift }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end

    context "when the params are valid" do
      let(:user) { create(:user, :employee, :in_company) }
      let(:current_user) { create(:user, :owner, company: user.company) }

      it "creates the shift", :aggregate_failures do
        expect { shift }.to change(Shift, :count).by(1)
        expect(shift).to have_attributes(user: user)
      end
    end
  end
end
