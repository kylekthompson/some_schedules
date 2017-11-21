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
  let(:context) { { current_user: current_user } }

  before do
    create(:user).shifts.create(attributes_for(:shift))
  end

  include_context 'with stubbed policies'

  context 'when there is a current user' do
    let(:current_user) { user }

    it 'finds the shifts for a user' do
      expect(result).to contain_exactly(shift)
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect { result }.to raise_error(GraphQL::ExecutionError) }
  end
end
