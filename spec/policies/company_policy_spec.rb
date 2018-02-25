# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CompanyPolicy, type: :model do
  subject(:policy) { described_class.new(current_user: current_user, subject: policy_subject) }

  describe '#scope' do
    let(:policy_subject) { Company }

    context 'when there is no user' do
      let(:current_user) { nil }

      before do
        create(:company)
      end

      it 'returns no companies' do
        expect(policy.scope).to be_empty
      end
    end

    context 'when there is an admin user' do
      let(:current_user) { create(:user, :admin) }
      let!(:viewable_company) { current_user.company }
      let!(:other_company) { create(:company) }

      it 'returns all companies' do
        expect(policy.scope).to contain_exactly(viewable_company, other_company)
      end
    end

    context 'when there is a non-admin user' do
      let(:current_user) { create(:user, admin: false) }
      let!(:viewable_company) { current_user.company }

      before do
        create(:company)
      end

      it 'returns only companies viewable by that user' do
        expect(policy.scope).to contain_exactly(viewable_company)
      end
    end
  end

  describe '#can_create?' do
    context 'when there is no current user' do
      let(:current_user) { nil }
      let(:policy_subject) { Company }

      specify { expect(policy.can_create?).to be(true) }
    end

    context 'when there is a current user with a company' do
      let(:current_user) { build(:user, company: build(:company)) }
      let(:policy_subject) { Company }

      specify { expect(policy.can_create?).to be(false) }
    end

    context 'when there is a current user without a company' do
      let(:current_user) { build(:user, company: nil) }
      let(:policy_subject) { Company }

      specify { expect(policy.can_create?).to be(true) }
    end

    context 'when there is a current user with a company and the user is an admin' do
      let(:current_user) { build(:user, :admin, company: nil) }
      let(:policy_subject) { Company }

      specify { expect(policy.can_create?).to be(true) }
    end
  end
end
