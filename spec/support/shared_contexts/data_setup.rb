# frozen_string_literal: true

RSpec.shared_context 'data_setup' do
  let(:create_company_one) { true }
  let(:create_company_two) { false }
  let(:company_one) { create(:company) }
  let(:company_two) { create(:company) }
  let(:user_one_shift_count) { 0 }
  let(:user_two_shift_count) { 0 }
  let(:create_user_one) { true }
  let(:create_user_two) { false }
  let(:user_one_role) { :employee }
  let(:user_two_role) { :employee }
  let(:user_one) do
    create(
      :user,
      :with_shifts,
      company: company_one,
      role: user_one_role,
      shift_count: user_one_shift_count
    )
  end
  let(:user_two) do
    create(
      :user,
      :with_shifts,
      company: company_two,
      role: user_one_role,
      shift_count: user_one_shift_count
    )
  end

  before do
    company_one if create_company_one
    company_two if create_company_two
    user_one if create_user_one
    user_two if create_user_two
  end
end
