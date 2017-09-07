# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateCompanyMutation, type: :model do
  subject(:mutation) { described_class.field }

  it { is_expected.to have_input_field(:name).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:slug).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to use_resolver(Resolvers::Company::Creator) }
end
