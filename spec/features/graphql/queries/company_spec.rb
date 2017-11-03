# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'query { company }' do
  subject(:query) do
    <<~GRAPHQL
      query {
        company(slug: "#{slug}") {
          id
          slug
          users {
            id
          }
          shifts {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:result) do
    SomeSchedulesSchema.execute(
      query,
      variables: variables,
      context: context
    ).with_indifferent_access[:data]
  end
  let(:variables) { { slug: slug } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { nil }
  let(:company) { create(:company) }

  context 'when there is a current user' do
    let(:current_user) { create(:user) }
    let(:slug) { company.slug }

    specify { expect(result[:company][:slug]).to eq(slug) }

    context 'but there is no company for the provided slug' do
      let(:slug) { super() + '-does-not-exist' }

      specify { expect(result[:company]).to be_nil }
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }
    let(:slug) { company.slug }

    specify { expect(result[:company]).to be_nil }
  end
end
