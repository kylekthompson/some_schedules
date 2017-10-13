# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Object::ShiftType, type: :model do
  subject(:type) { described_class }

  specify do
    expect(type).to have_interfaces(
      GraphQL::Relay::Node.interface,
      Types::Interface::TimestampsInterface,
      Types::Interface::ErrorsInterface
    )
  end
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::ID_TYPE) }
  it { is_expected.to have_field(:end_time).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:start_time).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:user).that_returns_type(Types::Object::UserType) }
end
