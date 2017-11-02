# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Object::CompanyType, type: :model do
  subject(:type) { described_class }

  specify do
    expect(type).to have_interfaces(
      Types::Interface::TimestampsInterface,
      Types::Interface::ErrorsInterface
    )
  end
  it { is_expected.to have_field(:id).that_returns_type(GraphQL::INT_TYPE) }
  it { is_expected.to have_field(:name).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:slug).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:users).that_returns_type(Types::Object::UserType) }
  it { is_expected.to have_field(:shifts).that_returns_type(Types::Object::ShiftType) }
end
