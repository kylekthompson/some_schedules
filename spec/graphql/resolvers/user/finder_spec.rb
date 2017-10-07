# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Finder, type: :model do
  subject(:resolver) { described_class }

  context 'when passed an id' do
    let(:user) { create(:user) }

    it 'handles an id that exists' do
      expect(resolver.call(nil, { id: user.id }, nil)).to eq(user)
    end

    it 'handles an id that does not exist' do
      expect(resolver.call(nil, { id: user.id + 1000 }, nil)).to be_nil
    end
  end
end
