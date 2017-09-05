# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::CompanyUserField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_arguments(:id) }
    it { is_expected.to have_return_type(Types::Objects::CompanyUserType) }
    it { is_expected.to use_resolver(Resolvers::CompanyUser::Finder) }
  end

  describe '.plural_field' do
    subject(:field) { described_class.plural_field }

    it { is_expected.to have_arguments(:ids) }
    it { is_expected.to have_return_type(Types::Objects::CompanyUserType) }
    it { is_expected.to use_resolver(Resolvers::CompanyUser::Finder) }
  end
end