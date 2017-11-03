# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::ShiftFinder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(company, arguments, context)
    end
  end
  let(:company) { create(:company, :with_owner) }
  let!(:shift) { company.users.first.shifts.create(attributes_for(:shift)) }
  let(:arguments) { nil }
  let(:context) { { current_user: current_user } }

  before do
    create(:company, :with_owner).users.first.shifts.create(attributes_for(:shift))
  end

  context 'when there is a current user' do
    let(:current_user) { company.users.first }

    it 'finds the shifts for a company' do
      expect(result).to contain_exactly(shift)
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect { result }.to raise_error(GraphQL::ExecutionError) }
  end
end
