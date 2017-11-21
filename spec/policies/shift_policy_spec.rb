# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ShiftPolicy, type: :model do
  subject(:policy) { described_class.new(current_user: current_user, subject: policy_subject) }

  describe '#scope' do
    let(:policy_subject) { Shift }

    context 'when there is no user' do
      let(:current_user) { nil }

      before do
        create(:shift)
      end

      it 'returns no shifts' do
        expect(policy.scope).to be_empty
      end
    end

    context 'when there is an admin user' do
      let(:current_user) { create(:user, :admin) }
      let!(:viewable_shift) { create(:shift, user: current_user) }
      let!(:other_shift) { create(:shift) }

      it 'returns all shifts' do
        expect(policy.scope).to contain_exactly(viewable_shift, other_shift)
      end
    end

    context 'when there is a non-admin user' do
      let(:current_user) { create(:user, admin: false, role: role) }
      let!(:viewable_shift) { create(:shift, user: current_user, published: true) }
      let(:other_user) { create(:user, company: current_user.company) }
      let!(:other_shift) { create(:shift, user: other_user, published: false) }

      before do
        create(:shift)
      end

      context 'when the user is an employee' do
        let(:role) { :employee }

        it 'returns only published shifts viewable by that user' do
          expect(policy.scope).to contain_exactly(viewable_shift)
        end
      end

      context 'when the user is any role higher than an employee' do
        let(:role) { :owner }

        it 'returns only shifts viewable by that user' do
          expect(policy.scope).to contain_exactly(viewable_shift, other_shift)
        end
      end
    end
  end

  describe '#can_create?' do
    context 'when the subject is a shift' do
      let(:policy_subject) { build(:shift, user: nil, user_id: user_id) }
      let(:user_id) { nil }

      context 'when there is no current user' do
        let(:current_user) { nil }

        specify { expect(policy.can_create?).to be(false) }
      end

      context 'when the current user is an admin' do
        let(:current_user) { build(:user, :admin) }
        let(:user_id) { create(:user).id }

        specify { expect(policy.can_create?).to be(true) }
      end

      context 'when the current user is an employee' do
        let(:current_user) { build(:user, :employee, admin: false) }
        let(:user_id) { create(:user, company: current_user.company).id }

        specify { expect(policy.can_create?).to be(false) }
      end

      context 'when the current user is an owner or manager of the same company' do
        let(:current_user) { build(:user, :manager, admin: false) }
        let(:user_id) { create(:user, company: current_user.company).id }

        specify { expect(policy.can_create?).to be(true) }
      end

      context 'when the current user is an owner or manager but of a different company' do
        let(:current_user) { build(:user, :manager, admin: false) }
        let(:user_id) { create(:user).id }

        specify { expect(policy.can_create?).to be(false) }
      end
    end

    context 'when the subject is not a shift' do
      let(:policy_subject) { Shift }
      let(:current_user) { create(:user) }

      specify { expect(policy.can_create?).to be(false) }
    end
  end
end
