# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Viewer, type: :model do
  subject(:resolver) { described_class }

  context 'when a user is logged in' do
    let(:user) { create(:user) }
    let(:result) { resolver.call(nil, nil, current_user: user) }

    specify { expect(result).to eq(user) }
  end

  context 'when a user is not logged in' do
    let(:result) { resolver.call(nil, nil, current_user: nil) }

    specify { expect(result).to be_nil }
  end
end
