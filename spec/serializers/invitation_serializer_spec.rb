# frozen_string_literal: true

require 'rails_helper'

RSpec.describe InvitationSerializer, type: :serializer do
  subject(:serializer) { described_class.new(invitation) }

  describe 'serialization' do
    let(:invitation) { build(:invitation) }
    let(:expected_keys) { %i[id created_at email expires_at updated_at user] }
    let(:expected_user_keys) { %i[id created_at updated_at] }

    it 'serializes properly', :aggregate_failures do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
      expect(serializer.serializable_hash[:user].keys).to contain_exactly(*expected_user_keys)
    end
  end
end
