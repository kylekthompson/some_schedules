# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::ShiftFinder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(user, arguments, context)
    end
  end
  let(:user) { create(:user) }
  let!(:shift) { user.shifts.create(attributes_for(:shift)) }
  let(:arguments) { nil }
  let(:context) { nil }

  before do
    create(:user).shifts.create(attributes_for(:shift))
  end

  it 'finds the shifts for a company' do
    expect(result).to contain_exactly(shift)
  end
end
