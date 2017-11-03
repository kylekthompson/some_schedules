# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Finder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(object, arguments, context)
    end
  end
  let(:company) { create(:company) }
  let(:object) { nil }
  let(:arguments) { {} }
  let(:context) { { current_user: current_user } }

  context 'when there is a current user' do
    let(:current_user) { create(:user) }

    context 'when passed a slug' do
      let(:arguments) { { slug: slug } }
      let(:slug) { company.slug }

      specify { expect(result).to eq(company) }

      context 'but the slug does not exist' do
        let(:slug) { super() + '-does-not-exist' }

        specify { expect(result).to be_nil }
      end
    end

    context 'when the object has a company method' do
      let(:object) { create(:user, :as_owner_of_a_company) }

      specify { expect(result).to eq(object.company) }
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }
    let(:slug) { company.slug }
    let(:arguments) { { slug: slug } }

    specify { expect(result).to be_nil }
  end
end
