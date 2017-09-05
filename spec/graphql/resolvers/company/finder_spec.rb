# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Finder, type: :model do
  subject(:resolver) { described_class }

  context 'when passed an id' do
    let(:company) { create(:company) }

    specify { expect(resolver.call(nil, { id: company.id }, nil)).to eq(company) }
  end

  context 'when passed ids' do
    let(:company1) { create(:company) }
    let(:company2) { create(:company) }

    specify { expect(resolver.call(nil, { ids: [company1.id, company2.id] }, nil)).to include(company1) }
    specify { expect(resolver.call(nil, { ids: [company1.id, company2.id] }, nil)).to include(company2) }
  end
end
