# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SignUpMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:company).of_type(Types::Input::CompanyInputType) }
  it { is_expected.to have_input_field(:user).of_type(Types::Input::UserInputType) }

  it { is_expected.to have_return_field(:company).of_type(Types::Object::CompanyType) }
  it { is_expected.to have_return_field(:companyErrors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:errors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:user).of_type(Types::Object::UserType) }
  it { is_expected.to have_return_field(:userErrors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:token).of_type(GraphQL::STRING_TYPE) }

  it { is_expected.to use_resolver(Resolvers::SignUp) }
end
