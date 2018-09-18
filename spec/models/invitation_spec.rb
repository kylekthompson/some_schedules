# frozen_string_literal: true

require "rails_helper"

RSpec.describe Invitation, type: :model do
  subject(:invitation) { build(:invitation) }

  it { is_expected.to callback(Helpers::EmailFormatter).before(:validation) }
  it { is_expected.to callback(:set_expires_at).before(:validation).on(:create) }

  it { is_expected.to validate_presence_of(:invited_by) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { is_expected.to allow_value("a@b.c").for(:email) }
  it { is_expected.to allow_value("a.b.c@d.e").for(:email) }
  it { is_expected.not_to allow_value("a.b").for(:email) }
  it { is_expected.to validate_presence_of(:role) }
  it { is_expected.to validate_inclusion_of(:role).in_array(User::Role::ALL) }

  it { is_expected.to belong_to(:invited_by) }
  it { is_expected.to have_one(:company).through(:invited_by) }
end
