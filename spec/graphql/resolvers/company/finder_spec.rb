# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Finder, type: :model do
  subject(:resolver) { described_class }

  let(:company) { create(:company) }
  let(:result) { resolver.call(obj, args, ctx) }
  let(:obj) { nil }
  let(:args) { nil }
  let(:ctx) { nil }

  context 'when passed a slug' do
    let(:args) { { slug: slug } }
    let(:slug) { company.slug }

    specify { expect(result).to eq(company) }

    context 'but the slug does not exist' do
      let(:slug) { super() + '-does-not-exist' }

      specify { expect(result).to be_nil }
    end
  end
end
