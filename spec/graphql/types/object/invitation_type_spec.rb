# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Object::InvitationType, type: :model do
  subject(:type) { described_class }

  specify do
    expect(type).to have_interfaces(
      Types::Interface::TimestampsInterface,
      Types::Interface::ErrorsInterface
    )
  end
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:email).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:company).that_returns_type(Types::Object::CompanyType) }
  it { is_expected.to have_field(:user).that_returns_type(Types::Object::UserType) }
  it { is_expected.to have_field(:accepted).that_returns_type(GraphQL::BOOLEAN_TYPE) }
end
