# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Objects::CompanyType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_interfaces(GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface) }
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::ID_TYPE) }
  it { is_expected.to have_field(:name).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:slug).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:companyUsers).that_returns_type(Types::Objects::CompanyUserType.connection_type) }
  it { is_expected.to have_field(:users).that_returns_type(Types::Objects::UserType.connection_type) }
end
