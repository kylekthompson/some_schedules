# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::MutationType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:createUser) }
end