# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to callback(Helpers::EmailFormatter).before(:validation) }

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { is_expected.to allow_value("a@b.c").for(:email) }
  it { is_expected.to allow_value("a.b.c@d.e").for(:email) }
  it { is_expected.not_to allow_value("a.b").for(:email) }
  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_length_of(:password).is_at_least(8) }
  it { is_expected.to validate_inclusion_of(:role).in_array(User::Role::ALL) }

  it { is_expected.to have_secure_password }

  it { is_expected.to belong_to(:company) }

  describe "#managerial?" do
    subject(:user) { build(:user, role: role) }

    context "when the user is an employee" do
      let(:role) { described_class::Role::EMPLOYEE }

      it "is false" do
        expect(user).not_to be_managerial
      end
    end

    context "when the user is a manager" do
      let(:role) { described_class::Role::MANAGER }

      it "is true" do
        expect(user).to be_managerial
      end
    end

    context "when the user is an owner" do
      let(:role) { described_class::Role::OWNER }

      it "is true" do
        expect(user).to be_managerial
      end
    end
  end

  describe "#owner?" do
    subject(:user) { build(:user, role: role) }

    context "when the user is an employee" do
      let(:role) { described_class::Role::EMPLOYEE }

      it "is false" do
        expect(user).not_to be_owner
      end
    end

    context "when the user is a manager" do
      let(:role) { described_class::Role::MANAGER }

      it "is false" do
        expect(user).not_to be_owner
      end
    end

    context "when the user is an owner" do
      let(:role) { described_class::Role::OWNER }

      it "is true" do
        expect(user).to be_owner
      end
    end
  end

  describe "#token" do
    context "when persisted" do
      subject(:user) { create(:user) }

      it "has a token" do
        expect(user.token).to be_present
      end
    end

    context "when not persisted" do
      subject(:user) { build(:user) }

      it "has no token" do
        expect(user.token).to be_nil
      end
    end
  end
end
