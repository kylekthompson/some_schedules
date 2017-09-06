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
      company = resolver.call(nil, company_attributes, context)
      expect(company.company_users.first.role).to eq('owner')
    end
  end

  context 'when passed invalid attributes' do
    let(:company_attributes) { attributes_for(:company).tap { |u| u[:email] = nil } }

    it 'does not create a company' do
      expect { resolver.call(nil, company_attributes, nil) }.not_to(change { Company.count })
    end
  end
end
