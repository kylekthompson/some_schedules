# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  subject(:company) { build(:company) }

  it { is_expected.to validate_presence_of(:slug) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:slug).ignoring_case_sensitivity }
  it { is_expected.to allow_value('ab_c-d1').for(:slug) }
  it { is_expected.not_to allow_value('ab.cd%/').for(:slug) }

  it { is_expected.to have_many(:users) }
end
