# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ShiftSerializer, type: :serializer do
  subject(:serializer) { described_class.new(shift) }

  describe 'serialization' do
    let(:shift) { build(:shift) }
    let(:expected_keys) { %i[id created_at end_time start_time updated_at user] }
    let(:expected_user_keys) { %i[id created_at updated_at] }

    it 'serializes properly', :aggregate_failures do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
      expect(serializer.serializable_hash[:user].keys).to contain_exactly(*expected_user_keys)
    end
  end
end
