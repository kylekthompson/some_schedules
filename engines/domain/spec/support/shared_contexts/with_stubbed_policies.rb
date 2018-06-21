# frozen_string_literal: true

RSpec.shared_context 'with stubbed policies' do
  let(:company_policy) { instance_double(CompanyPolicy, can_create?: true) }
  let(:invitation_policy) { instance_double(InvitationPolicy, can_invite?: true) }
  let(:shift_policy) { instance_double(ShiftPolicy, can_create?: true) }
  let(:user_policy) { instance_double(UserPolicy, can_create?: true) }

  before do
    allow(CompanyPolicy).to receive(:new).and_return(company_policy)
    allow(InvitationPolicy).to receive(:new).and_return(invitation_policy)
    allow(ShiftPolicy).to receive(:new).and_return(shift_policy)
    allow(UserPolicy).to receive(:new).and_return(user_policy)

    allow(company_policy).to receive(:scope) { Company.all }
    allow(invitation_policy).to receive(:scope) { Invitation.all }
    allow(shift_policy).to receive(:scope) { Shift.all }
    allow(user_policy).to receive(:scope) { User.all }
  end
end
