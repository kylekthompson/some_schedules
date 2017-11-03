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
  let(:arguments) { nil }
  let(:context) { nil }

  context 'when passed an id' do
    let(:arguments) { { id: id } }
    let(:id) { user.id }

    specify { expect(result).to eq(user) }

    context 'but the id does not exist' do
      let(:id) { (User.last&.id || 0) + 1000 }

      specify { expect(result).to be_nil }
    end
  end
end
