# frozen_string_literal: true

RSpec.shared_context 'with stubbed policies' do
  let(:company_policy) { instance_double(CompanyPolicy) }
  let(:shift_policy) { instance_double(ShiftPolicy) }
  let(:user_policy) { instance_double(UserPolicy) }

  before do
    allow(CompanyPolicy).to receive(:new).and_return(company_policy)
    allow(ShiftPolicy).to receive(:new).and_return(shift_policy)
    allow(UserPolicy).to receive(:new).and_return(user_policy)

    allow(company_policy).to receive(:scope) { Company.all }
    allow(shift_policy).to receive(:scope) { Shift.all }
    allow(user_policy).to receive(:scope) { User.all }
  end
end
