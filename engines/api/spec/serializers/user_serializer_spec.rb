# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSerializer, type: :serializer do
  subject(:serializer) { described_class.new(user) }

  describe 'serialization' do
    let(:user) { build(:user) }
    let(:expected_keys) { %i[id created_at email first_name last_name updated_at] }

    it 'serializes properly' do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
    end
  end
end
