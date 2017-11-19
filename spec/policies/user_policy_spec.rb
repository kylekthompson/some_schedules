# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :model do
  subject(:policy) { described_class.new(user: user, policed: policed) }

  describe '#read?' do
    let(:user) { build(:user, company_id: company_id) }
    let(:company_id) { 1 }

    context 'when the policed value is a user in the same company' do
      let(:policed) { build(:user, company_id: company_id) }

      specify { expect(policy.read?).to be(true) }
    end

    context 'when the policed value is a user in a different company' do
      let(:policed) { build(:user, company_id: company_id + 1) }

      specify { expect(policy.read?).to be(false) }
    end

    context 'when the policed value is anything else' do
      let(:policed) { 'anything else' }

      specify { expect(policy.read?).to be(false) }
    end
  end

  describe '#create?' do
    let(:policed) { nil }

    context 'when there is a user' do
      let(:user) { build(:user) }

      specify { expect(policy.create?).to be(false) }
    end

    context 'when there is not a user' do
      let(:user) { nil }

      specify { expect(policy.create?).to be(true) }
    end
  end
end
