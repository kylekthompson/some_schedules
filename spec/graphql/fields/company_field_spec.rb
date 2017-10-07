# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::CompanyField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_argument(:slug).of_type(GraphQL::STRING_TYPE) }
    it { is_expected.to have_return_type(Types::Object::CompanyType) }
    it { is_expected.to use_resolver(Resolvers::Company::Finder) }
  end
end
