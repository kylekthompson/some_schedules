# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateInvitationMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:email).of_type(GraphQL::STRING_TYPE) }

  it { is_expected.to have_return_field(:errors).of_type(Types::Scalar::JsonBlobType) }
  it { is_expected.to have_return_field(:invitation).of_type(Types::Object::InvitationType) }

  it { is_expected.to use_resolver(Resolvers::Invitation::Creator) }
end