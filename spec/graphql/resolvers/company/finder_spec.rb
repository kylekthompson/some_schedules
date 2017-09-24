# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Finder, type: :model do
  subject(:resolver) { described_class }

  context 'when passed a slug' do
    let(:company) { create(:company) }

    it 'handles a slug that exists' do
      expect(resolver.call(nil, { slug: company.slug }, nil)).to eq(company)
    end

    it 'handles a slug that does not exist' do
      expect(resolver.call(nil, { slug: "#{company.slug}-does-not-exist" }, nil)).to be_nil
    end
  end
end
