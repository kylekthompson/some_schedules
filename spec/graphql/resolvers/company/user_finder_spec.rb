# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::UserFinder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(company, arguments, context)
    end
  end
  let(:company) { create(:company) }
  let!(:user) { company.users.create(attributes_for(:user)) }
  let(:arguments) { nil }
  let(:context) { nil }

  before do
    create(:company, :with_owner)
  end

  it 'finds the users for a company' do
    expect(result).to contain_exactly(user)
  end
end
