# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Interfaces::TimestampsInterface, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_field(:createdAt).that_returns_type(GraphQL::STRING_TYPE) }
  it { is_expected.to have_field(:updatedAt).that_returns_type(GraphQL::STRING_TYPE) }
end
