# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Relay::TypeResolver, type: :model do
  subject(:schema) { described_class }
  let(:user) { build(:user) }

  it 'raises when passed an unknown object' do
    expect { described_class.call(nil, 1, nil) }.to raise_error(ArgumentError)
  end

  it 'returns the correct type of a known type' do
    expect(described_class.call(nil, user, nil)).to eq(Types::Objects::UserType)
  end
end
