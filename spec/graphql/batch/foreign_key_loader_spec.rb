# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Batch::ForeignKeyLoader, type: :model do
  let!(:company_one) { create(:company, :with_owner) }
  let!(:company_two) { create(:company, :with_owner) }
  let(:current_user) { create(:user) }
  let(:result) do
    GraphQL::Batch.batch do
      described_class.for(User, :company_id, user: current_user).load(ids)
    end
  end

  context 'when passed a single id' do
    let(:ids) { company_one.id }

    include_context 'with stubbed policies'

    it 'finds the correct records' do
      expect(result.map(&:company_id)).to all(eq(company_one.id))
    end
  end

  context 'when passed an array of ids' do
    let(:ids) { [company_one.id, company_two.id] }

    include_context 'with stubbed policies'

    it 'finds the correct records' do
      expect(result.map(&:company_id).compact.uniq).to contain_exactly(*ids)
    end
  end

  context 'when passed a scope proc' do
    let(:ids) { [company_one.id, company_two.id] }
    let(:user_without_shifts) { company_one.users.first }
    let(:user_with_shifts) { company_two.users.first }
    let(:result) do
      GraphQL::Batch.batch do
        described_class.for(
          User,
          :company_id,
          user: current_user,
          scope_proc: ->(scope) { scope.left_outer_joins(:shifts).where(shifts: { id: nil }) }
        ).load(ids)
      end
    end

    include_context 'with stubbed policies'

    before do
      user_with_shifts.shifts.create(attributes_for(:shift))
    end

    it 'properly scopes the query' do
      expect(result).to contain_exactly(user_without_shifts)
    end
  end
end
