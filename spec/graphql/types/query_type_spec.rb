# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:company).that_returns_type(Types::Objects::CompanyType) }
  it { is_expected.to have_field(:companies).that_returns_type(Types::Objects::CompanyType) }
  it { is_expected.to have_field(:companyUser).that_returns_type(Types::Objects::CompanyUserType) }
  it { is_expected.to have_field(:companyUsers).that_returns_type(Types::Objects::CompanyUserType) }
  it { is_expected.to have_field(:user).that_returns_type(Types::Objects::UserType) }
  it { is_expected.to have_field(:users).that_returns_type(Types::Objects::UserType) }
  it { is_expected.to have_field(:token).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:node).that_returns_type(GraphQL::Relay::Node.interface) }
  it { is_expected.to have_field(:nodes).that_returns_type(GraphQL::Relay::Node.interface) }
end
