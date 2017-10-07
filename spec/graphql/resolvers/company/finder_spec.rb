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

  context 'when passed a user_id' do
    let(:company) { create(:company, :with_owner) }
    let(:args) { { user_id: user_id } }
    let(:user_id) { company.user.id }

    it 'grabs the company for that user' do
      expect(result).to eq(company)
    end

    context 'but the user_id does not exist' do
      let(:user_id) { super() + 1000 }

      specify { expect(result).to be_nil }
    end
  end
end
