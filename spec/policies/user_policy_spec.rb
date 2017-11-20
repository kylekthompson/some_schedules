# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :model do
  subject(:policy) { described_class.new(current_user: user, subject: subject) }

  describe '#scope' do
    let(:subject) { User }

    context 'when there is no user' do
      let(:user) { nil }

      before do
        create(:user)
      end

      it 'returns no users' do
        expect(policy.scope).to be_empty
      end
    end

    context 'when there is a user' do
      let(:user) { create(:user) }
      let!(:other_user) { create(:user, company_id: user.company_id) }

      before do
        create(:user)
      end

      it 'returns no users' do
        expect(policy.scope).to contain_exactly(user, other_user)
      end
    end
  end

  describe '#can_create?' do
    let(:subject) { nil }

    context 'when there is a user' do
      let(:user) { build(:user) }

      specify { expect(policy.can_create?).to be(false) }
    end

    context 'when there is not a user' do
      let(:user) { nil }

      specify { expect(policy.can_create?).to be(true) }
    end
  end
end
