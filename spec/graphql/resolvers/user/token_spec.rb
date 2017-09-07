# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Token, type: :model do
  subject(:resolver) { described_class }

  let(:ctx) { { current_user: current_user } }
  let(:args) { { email: email, password: password } }
  let(:actual_password) { 'password' }
  let(:obj) { create(:user, password: actual_password, password_confirmation: actual_password) }
  let(:result) { resolver.call(obj, args, ctx) }
  let(:token) { instance_double(Knock::AuthToken) }

  before do
    allow(Knock::AuthToken).to receive(:new).and_return(token)
    allow(token).to receive(:token).and_return('')
  end

  context 'when the correct password is provided' do
    let(:current_user) { nil }
    let(:email) { nil }
    let(:password) { actual_password }

    specify { expect(result).not_to be_nil }

    it 'actually gets a token' do
      result
      expect(token).to have_received(:token)
    end
  end

  context 'when an incorrect password is provided' do
    let(:current_user) { nil }
    let(:email) { nil }
    let(:password) { 'abc' }

    specify { expect(result).to be_nil }
  end

  context 'when the current_user is the user requested and no password is provided' do
    let(:current_user) { obj }
    let(:email) { nil }
    let(:password) { nil }

    specify { expect(result).not_to be_nil }

    it 'actually gets a token' do
      result
      expect(token).to have_received(:token)
    end
  end

  context 'when the current_user is not the user requested and no password is provided' do
    let(:current_user) { nil }
    let(:email) { nil }
    let(:password) { nil }

    specify { expect(result).to be_nil }
  end

  context 'when a matching email and password are provided' do
    let(:result) { resolver.call(nil, args, ctx) }
    let(:current_user) { nil }
    let(:email) { obj.email }
    let(:password) { actual_password }

    it 'actually gets a token' do
      result
      expect(token).to have_received(:token)
    end
  end

  context 'when an email and incorrect password are provided' do
    let(:result) { resolver.call(nil, args, ctx) }
    let(:current_user) { nil }
    let(:email) { obj.email }
    let(:password) { 'abc' }

    specify { expect(result).to be_nil }
  end
end
