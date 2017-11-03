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
  let(:context) { nil }

  before do
    create(:company, :with_owner).users.first.shifts.create(attributes_for(:shift))
  end

  it 'finds the shifts for a company' do
    expect(result).to contain_exactly(shift)
  end
end
