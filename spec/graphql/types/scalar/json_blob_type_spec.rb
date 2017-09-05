# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Scalar::JsonBlobType, type: :model do
  subject(:type) { described_class }

  describe '.coerce_isolated_result' do
    it 'returns the value passed' do
      expect(type.coerce_isolated_result({})).to eq({})
    end
  end
end
