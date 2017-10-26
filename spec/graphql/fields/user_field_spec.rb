# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::UserField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_argument(:id).of_type(GraphQL::INT_TYPE) }
    it { is_expected.to have_return_type(Types::Object::UserType) }
    it { is_expected.to use_resolver(Resolvers::User::Finder) }
  end
end
