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
  let!(:shift) { company.users.first.shifts.create(attributes_for(:shift, start_time: 1.day.ago)) }
  let(:arguments) { {} }
  let(:context) { { current_user: current_user } }

  before do
    create(:company, :with_owner).users.first.shifts.create(attributes_for(:shift))
  end

  include_context 'with stubbed policies'

  context 'when there is a current user' do
    let(:current_user) { company.users.first }

    it 'finds the shifts for a company' do
      expect(result).to contain_exactly(shift)
    end

    context 'when the after argument is provided' do
      let(:arguments) { { after: Time.current } }

      it 'does not include shifts before that time' do
        expect(result).to be_empty
      end
    end

    context 'when the before argument is provided' do
      let(:arguments) { { before: 1.month.ago } }

      it 'does not include shifts after that time' do
        expect(result).to be_empty
      end
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect { result }.to raise_error(GraphQL::ExecutionError) }
  end
end
