# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateShiftMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:endTime).of_type(Types::Scalar::DateType) }
  it { is_expected.to have_input_field(:startTime).of_type(Types::Scalar::DateType) }
  it { is_expected.to have_input_field(:userId).of_type(GraphQL::INT_TYPE) }

  it { is_expected.to have_return_field(:errors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:shift).of_type(Types::Object::ShiftType) }

  it { is_expected.to use_resolver(Resolvers::Shift::Creator) }
end
