# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::User::TokenField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_argument(:password).of_type(GraphQL::STRING_TYPE) }
    it { is_expected.to have_return_type(GraphQL::STRING_TYPE) }
    it { is_expected.to use_resolver(Resolvers::User::Token) }
  end
end
