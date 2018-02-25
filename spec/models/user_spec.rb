# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to callback(Helpers::EmailFormatter).before(:validation) }

  it { is_expected.to validate_presence_of(:company) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { is_expected.to allow_value('a@b.c').for(:email) }
  it { is_expected.to allow_value('a.b.c@d.e').for(:email) }
  it { is_expected.not_to allow_value('a.b').for(:email) }
  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_length_of(:password).is_at_least(8) }
  it { is_expected.to validate_presence_of(:role) }

  it { is_expected.to have_secure_password }

  it { is_expected.to belong_to(:company) }
  it { is_expected.to have_many(:invitations) }
  it { is_expected.to have_many(:shifts) }

  describe '#role' do
    ROLES = {
      owner: 0,
      manager: 1,
      employee: 2
    }.freeze

    ROLES.each do |role, value|
      it "#{role} has value #{value}" do
        expect(described_class.roles[role]).to eq(value)
      end
    end
  end
end
