# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Creator, type: :model do
  subject(:resolver) { described_class }

  context 'when passed valid attributes' do
    let(:company_attributes) { attributes_for(:company) }
    let(:context) { { current_user: create(:user) } }

    it 'creates a company' do
      expect { resolver.call(nil, company_attributes, context) }.to change { Company.count }.by(1)
    end

    it 'correctly adds the user to the company as an owner' do
      company = resolver.call(nil, company_attributes, context)[:company]
      expect(company.company_users.first.role).to eq('owner')
    end
  end

  context 'when passed invalid attributes and a current_user' do
    let(:company_attributes) { attributes_for(:company).tap { |u| u[:name] = nil } }
    let(:context) { { current_user: create(:user) } }

    it 'does not create a company' do
      expect { resolver.call(nil, company_attributes, context) }.not_to(change { Company.count })
    end

    it 'returns nil' do
      expect(resolver.call(nil, company_attributes, context)[:company]).to be_nil
    end
  end

  context 'when passed invalid attributes and no current_user' do
    let(:company_attributes) { attributes_for(:company).tap { |u| u[:name] = nil } }
    let(:context) { {} }

    it 'does not create a company' do
      expect { resolver.call(nil, company_attributes, context) }.not_to(change { Company.count })
    end

    it 'returns an error' do
      expect(resolver.call(nil, company_attributes, context)).to be_a(GraphQL::ExecutionError)
    end
  end
end
