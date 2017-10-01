# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateUserMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:firstName).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:lastName).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:email).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:password).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:passwordConfirmation).of_type(GraphQL::STRING_TYPE) }

  it { is_expected.to have_return_field(:errors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:token).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_return_field(:user).of_type(Types::Object::UserType) }

  it { is_expected.to use_resolver(Resolvers::User::Creator) }
end
