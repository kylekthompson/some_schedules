# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Batch::ForeignKeyLoader, type: :model do
  let!(:company_one) { create(:company, :with_owner) }
  let!(:company_two) { create(:company, :with_owner) }
  let(:result) do
    GraphQL::Batch.batch do
      described_class.for(User, :company_id).load(ids)
    end
  end

  context 'when passed a single id' do
    let(:ids) { company_one.id }

    it 'finds the correct records' do
      expect(result.map(&:company_id)).to all(eq(company_one.id))
    end
  end

  context 'when passed an array of ids' do
    let(:ids) { [company_one.id, company_two.id] }

    it 'finds the correct records' do
      expect(result.map(&:company_id).compact.uniq).to contain_exactly(*ids)
    end
  end
end