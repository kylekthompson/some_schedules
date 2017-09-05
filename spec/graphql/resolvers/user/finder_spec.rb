# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Finder, type: :model do
  subject(:resolver) { described_class }

  context 'when passed an id' do
    let(:user) { create(:user) }

    specify { expect(resolver.call(nil, { id: user.id }, nil)).to eq(user) }
  end

  context 'when passed ids' do
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }

    specify { expect(resolver.call(nil, { ids: [user1.id, user2.id] }, nil)).to include(user1) }
    specify { expect(resolver.call(nil, { ids: [user1.id, user2.id] }, nil)).to include(user2) }
  end
end
