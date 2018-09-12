# frozen_string_literal: true

require "rails_helper"

RSpec.describe Company, type: :model do
  subject(:company) { build(:company) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to have_many(:users) }
end
