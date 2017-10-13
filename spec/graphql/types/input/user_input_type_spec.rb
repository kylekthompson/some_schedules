# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Input::UserInputType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_input_field(:firstName).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:lastName).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:email).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:password).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:passwordConfirmation).of_type(GraphQL::STRING_TYPE) }
end
