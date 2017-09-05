# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:company, Types::Objects::CompanyType) }
  it { is_expected.to have_field(:companies, Types::Objects::CompanyType) }
  it { is_expected.to have_field(:companyUser, Types::Objects::CompanyUserType) }
  it { is_expected.to have_field(:companyUsers, Types::Objects::CompanyUserType) }
  it { is_expected.to have_field(:user, Types::Objects::UserType) }
  it { is_expected.to have_field(:users, Types::Objects::UserType) }
  it { is_expected.to have_field(:node, GraphQL::Relay::Node.interface) }
  it { is_expected.to have_field(:nodes, GraphQL::Relay::Node.interface) }
end
