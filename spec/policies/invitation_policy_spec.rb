# frozen_string_literal: true

require 'rails_helper'

RSpec.describe InvitationPolicy, type: :model do
  subject(:policy) { described_class.new(current_user: current_user, subject: policy_subject) }

  describe '#scope' do
    let(:policy_subject) { Invitation }

    context 'when there is no user' do
      let(:current_user) { nil }

      before do
        create(:invitation)
      end

      it 'returns no invitations' do
        expect(policy.scope).to be_empty
      end
    end

    context 'when there is an admin user' do
      let(:current_user) { create(:user, :admin) }
      let!(:company_invitation) { current_user.invitations.create(attributes_for(:invitation)) }
      let!(:other_invitation) { create(:invitation) }

      it 'returns all invitations' do
        expect(policy.scope).to contain_exactly(company_invitation, other_invitation)
      end
    end

    context 'when there is a non-admin user' do
      let!(:viewable_invitation) { current_user.invitations.create(attributes_for(:invitation)) }

      before do
        create(:invitation)
      end

      context 'when the user is an owner or manager' do
        let(:current_user) { create(:user, :owner, admin: false) }

        it 'can see only invitations within their company' do
          expect(policy.scope).to contain_exactly(viewable_invitation)
        end
      end

      context 'when the user is an employee' do
        let(:current_user) { create(:user, :employee, admin: false) }

        it 'cannot see any invitations' do
          expect(policy.scope).to be_empty
        end
      end
    end
  end
end
