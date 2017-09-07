# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Interfaces::ErrorsInterface, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:errors).that_returns_type(Types::Scalar::JsonBlobType) }
end
