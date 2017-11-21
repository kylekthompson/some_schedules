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
end
