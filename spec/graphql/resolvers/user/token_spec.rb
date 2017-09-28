# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Token, type: :model do
  subject(:resolver) { described_class }

  let(:ctx) { nil }
  let(:args) { { email: email, password: password } }
  let(:actual_password) { 'password' }
  let(:obj) { create(:user, password: actual_password, password_confirmation: actual_password) }
  let(:token) { instance_double(Knock::AuthToken) }
  let(:email) { obj.email }

  before do
    allow(Knock::AuthToken).to receive(:new).and_return(token)
    allow(token).to receive(:token).and_return('')
  end

  context 'when the correct password is provided' do
    let(:password) { actual_password }

    specify { expect(resolver.call(obj, args, ctx)[:token]).not_to be_nil }

    it 'actually gets a token' do
      resolver.call(obj, args, ctx)
      expect(token).to have_received(:token)
    end
  end

  context 'when an incorrect password is provided' do
    let(:password) { 'abc' }

    specify { expect(resolver.call(obj, args, ctx)[:token]).to be_nil }
  end

  context 'when an incorrect email is provided' do
    let(:email) { 'bad@email.com' }
    let(:password) { actual_password }

    specify { expect(resolver.call(obj, args, ctx)[:token]).to be_nil }
  end
end
