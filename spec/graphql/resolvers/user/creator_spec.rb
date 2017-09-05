# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Creator, type: :model do
  subject(:resolver) { described_class }

  context 'when passed valid attributes' do
    let(:user_attributes) { attributes_for(:user) }

    it 'creates a user' do
      expect { resolver.call(nil, user_attributes, nil) }.to change { User.count }.by(1)
    end
  end

  context 'when passed invalid attributes' do
    let(:user_attributes) { attributes_for(:user).tap { |u| u[:email] = nil } }

    it 'does not create a user' do
      expect { resolver.call(nil, user_attributes, nil) }.not_to(change { User.count })
    end
  end
end
