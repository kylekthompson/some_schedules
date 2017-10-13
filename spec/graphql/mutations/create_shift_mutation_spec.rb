# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateShiftMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:end_time).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:start_time).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:user_id).of_type(GraphQL::ID_TYPE) }

  it { is_expected.to have_return_field(:errors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:shift).of_type(Types::Object::ShiftType) }

  it { is_expected.to use_resolver(Resolvers::Shift::Creator) }
end
