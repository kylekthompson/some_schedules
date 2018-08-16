# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Companies::CreationService do
  describe ".create" do
    let(:company) { described_class.create(params) }
    let(:user) { create(:user, :owner, company: nil) }
    let(:params) { attributes_for(:company, users: []).merge(user: user) }

    context "when the params are valid" do
      it "creates the company", :aggregate_failures do
        expect { company }.to change(Company, :count).by(1)
        expect(user.reload.company).to eq(company)
        expect(company.users.count).to eq(1)
      end
    end

    context "when the user belongs to a company" do
      let(:user) { create(:user, :in_company) }

      it "raises" do
        expect { company }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end

    context "when the user is not an owner" do
      let(:user) { create(:user, :employee, company: nil) }

      it "raises" do
        expect { company }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end
  end
end
