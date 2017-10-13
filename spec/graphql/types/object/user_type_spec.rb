# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Object::UserType, type: :model do
  subject(:type) { described_class }

  specify do
    expect(type).to have_interfaces(
      GraphQL::Relay::Node.interface,
      Types::Interface::TimestampsInterface,
      Types::Interface::ErrorsInterface
    )
  end
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::ID_TYPE) }
  it { is_expected.to have_field(:email).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:firstName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:lastName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:role).that_returns_type(Types::Enum::UserRoleEnum) }
  it { is_expected.to have_field(:company).that_returns_type(Types::Object::CompanyType) }
  it { is_expected.to have_field(:shifts).that_returns_type(Types::Object::ShiftType.connection_type) }
end
