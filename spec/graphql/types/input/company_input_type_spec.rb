# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Input::CompanyInputType, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_input_field(:name).of_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_input_field(:slug).of_type(GraphQL::STRING_TYPE) }
end
