# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :model do
  subject(:policy) { described_class.new(current_user: current_user, subject: subject) }

  describe '#scope' do
    let(:subject) { User }

    context 'when there is no user' do
      let(:current_user) { nil }

      before do
        create(:user)
      end

      it 'returns no users' do
        expect(policy.scope).to be_empty
      end
    end

    context 'when there is a user' do
      let(:current_user) { create(:user) }
      let!(:other_user) { create(:user, company_id: current_user.company_id) }

      before do
        create(:user)
      end

      it 'returns no users' do
        expect(policy.scope).to contain_exactly(current_user, other_user)
      end
    end
  end

  describe '#can_create?' do
    context 'when the subject is a user' do
      let(:subject) { build(:user) }

      context 'and the current user is an admin' do
        let(:current_user) { build(:user, :admin) }

        specify { expect(policy.can_create?).to be(true) }
      end

      context 'and the current user is not an admin' do
        let(:current_user) { build(:user, admin: false) }

        specify { expect(policy.can_create?).to be(false) }
      end

      context 'and there is not a current user' do
        let(:current_user) { nil }

        it 'will not allow creating an admin user' do
          subject.admin = true
          expect(policy.can_create?).to be(false)
        end

        it 'will allow creating a non-admin user' do
          subject.admin = false
          expect(policy.can_create?).to be(true)
        end
      end
    end

    context 'when the subject is not a user' do
      let(:subject) { User }

      context 'and the current user is an admin' do
        let(:current_user) { build(:user, :admin) }

        specify { expect(policy.can_create?).to be(true) }
      end

      context 'and the current user is not an admin' do
        let(:current_user) { build(:user, admin: false) }

        specify { expect(policy.can_create?).to be(false) }
      end

      context 'and there is not a current user' do
        let(:current_user) { nil }

        specify { expect(policy.can_create?).to be(true) }
      end
    end
  end
end
