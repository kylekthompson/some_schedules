# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Schedules::ContextSerializer, type: :serializer do
  subject(:serializer) { described_class.new(context) }

  describe 'serialization' do
    include_context 'with stubbed policies'

    let!(:user) { create(:user) }
    let!(:shift) { create(:shift) }
    let(:context) { Schedules::Context.new(after: 1.day.ago, before: 1.day.from_now, user: user) }
    let(:expected_keys) { %i[users shifts] }
    let(:expected_user_keys) { %i[id created_at first_name last_name updated_at] }
    let(:expected_shift_keys) { %i[id created_at end_time published start_time updated_at user] }
    let(:expected_shift_user_keys) { %i[id created_at updated_at] }
    let(:shift_policy) { instance_double(ShiftPolicy) }
    let(:user_policy) { instance_double(UserPolicy) }

    before do
      allow(shift_policy).to receive(:scope) { Shift.where(id: shift.id) }
      allow(user_policy).to receive(:scope) { User.where(id: user.id) }
    end

    it 'serializes properly', :aggregate_failures do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
      expect(serializer.serializable_hash[:users].first.keys).to contain_exactly(*expected_user_keys)
      expect(serializer.serializable_hash[:shifts].first.keys).to contain_exactly(*expected_shift_keys)
      expect(serializer.serializable_hash[:shifts].first[:user].keys).to contain_exactly(*expected_shift_user_keys)
    end
  end
end
