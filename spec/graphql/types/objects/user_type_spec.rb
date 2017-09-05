# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Objects::UserType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_interfaces(GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface) }
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::ID_TYPE) }
  it { is_expected.to have_field(:email).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:firstName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:lastName).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:token).that_returns_type(GraphQL::STRING_TYPE) }
end
