# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::InvitationFinder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(company, arguments, context)
    end
  end
  let(:company) { create(:company, :with_owner) }
  let!(:invitation) { company.users.first.invitations.create(attributes_for(:invitation)) }
  let(:arguments) { {} }
  let(:context) { { current_user: current_user } }

  before do
    create(:company, :with_owner).users.first.invitations.create(attributes_for(:invitation))
  end

  include_context 'with stubbed policies'

  context 'when there is a current user' do
    let(:current_user) { company.users.first }

    it 'finds the invitations for a company' do
      expect(result).to contain_exactly(invitation)
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }

    specify { expect { result }.to raise_error(GraphQL::ExecutionError) }
  end
end
