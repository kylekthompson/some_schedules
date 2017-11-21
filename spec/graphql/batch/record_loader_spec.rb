# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Batch::RecordLoader, type: :model do
  let(:current_user) { create(:user) }

  context 'when only passed a model' do
    let(:result) do
      GraphQL::Batch.batch do
        described_class.for(User, user: current_user).load(id)
      end
    end

    include_context 'with stubbed policies'

    context 'when the record exists' do
      let(:user) { create(:user) }
      let(:id) { user.id }

      it 'finds the record' do
        expect(result).to eq(user)
      end
    end

    context 'when the record does not exist' do
      let(:id) { (User.last&.id || 0) + 1000 }

      it 'returns nil' do
        expect(result).to be_nil
      end
    end
  end

  context 'when passed a specific lookup column' do
    let!(:company) { create(:company, :with_owner) }
    let(:user) { company.users.first }
    let(:result) do
      GraphQL::Batch.batch do
        described_class.for(User, user: current_user, lookup_column: :company_id).load(company_id)
      end
    end

    include_context 'with stubbed policies'

    before do
      create(:company, :with_owner)
    end

    context 'when there is a user that matches' do
      let(:company_id) { user.company_id }

      it 'finds the record' do
        expect(result).to eq(user)
      end
    end

    context 'when there is not a user that matches' do
      let(:company_id) { (Company.last&.id || 0) + 1000 }

      it 'returns nil' do
        expect(result).to be_nil
      end
    end
  end

  context 'when passed a scope to merge' do
    class User
      scope :without_shifts, -> { left_outer_joins(:shifts).where(shifts: { id: nil }) }
    end
    let!(:company) { create(:company) }
    let!(:user_without_shifts) { company.users.create(attributes_for(:user)) }
    let(:user_with_shifts) { company.users.create(attributes_for(:user)) }
    let(:company_id) { company.id }
    let(:result) do
      GraphQL::Batch.batch do
        described_class.for(
          User,
          user: current_user,
          lookup_column: :company_id,
          merge: User.without_shifts
        ).load(company_id)
      end
    end

    include_context 'with stubbed policies'

    before do
      user_with_shifts.shifts.create(attributes_for(:shift))
    end

    it 'properly scopes the query' do
      expect(result).to eq(user_without_shifts)
    end
  end
end
