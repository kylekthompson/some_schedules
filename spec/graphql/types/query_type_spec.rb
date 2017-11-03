# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:company).that_returns_type(Types::Object::CompanyType) }
  it { is_expected.to have_field(:companies).that_returns_type(Types::Object::CompanyType) }
  it { is_expected.to have_field(:user).that_returns_type(Types::Object::UserType) }
  it { is_expected.to have_field(:viewer).that_returns_type(Types::Object::UserType) }
end
