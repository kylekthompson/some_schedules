# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::Company::ShiftsField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_argument(:after).of_type(Types::Scalar::DateType) }
    it { is_expected.to have_argument(:before).of_type(Types::Scalar::DateType) }

    it { is_expected.to have_return_type(Types::Object::ShiftType) }
    it { is_expected.to use_resolver(Resolvers::Company::ShiftFinder) }
  end
end
