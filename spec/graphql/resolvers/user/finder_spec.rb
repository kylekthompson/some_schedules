# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Finder, type: :model do
  subject(:resolver) { described_class }

  let(:result) do
    GraphQL::Batch.batch do
      resolver.call(object, arguments, context)
    end
  end
  let(:user) { create(:user) }
  let(:object) { nil }
  let(:arguments) { { id: id } }
  let(:context) { { current_user: current_user } }

  context 'when there is a current user' do
    let(:current_user) { user }

    context 'when passed an id' do
      let(:id) { user.id }

      specify { expect(result).to eq(user) }

      context 'but the id does not exist' do
        let(:id) { (User.last&.id || 0) + 1000 }

        specify { expect(result).to be_nil }
      end
    end
  end

  context 'when there is not a current user' do
    let(:current_user) { nil }
    let(:id) { user.id }

    specify { expect(result).to be_nil }
  end
end
