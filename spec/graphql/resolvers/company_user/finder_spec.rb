# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::CompanyUser::Finder, type: :model do
  subject(:resolver) { described_class }

  context 'when passed an id' do
    let(:company_user) { create(:company_user) }

    specify { expect(resolver.call(nil, { id: company_user.id }, nil)).to eq(company_user) }
  end

  context 'when passed ids' do
    let(:company_user1) { create(:company_user) }
    let(:company_user2) { create(:company_user) }

    specify { expect(resolver.call(nil, { ids: [company_user1.id, company_user2.id] }, nil)).to include(company_user1) }
    specify { expect(resolver.call(nil, { ids: [company_user1.id, company_user2.id] }, nil)).to include(company_user2) }
  end
end
