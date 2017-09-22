# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Objects::UserType, type: :model do
  subject(:type) { described_class }

  specify do
    expect(type).to have_interfaces(
      GraphQL::Relay::Node.interface,
      Types::Interfaces::TimestampsInterface,
      Types::Interfaces::ErrorsInterface
    )
  end
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::ID_TYPE) }
  it { is_expected.to have_field(:email).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:firstName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:lastName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:companies).that_returns_type(Types::Objects::CompanyType.connection_type) }
  it { is_expected.to have_field(:companyUsers).that_returns_type(Types::Objects::CompanyUserType.connection_type) }
end
