# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::SignIn, type: :model do
  subject(:resolver) { described_class.new(args) }

  let(:args) { { email: email, password: password } }
  let(:user) { create(:user, password: actual_password, password_confirmation: actual_password) }
  let(:actual_password) { 'password' }
  let(:password) { actual_password }
  let(:email) { user.email }

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password) }

  describe 'validating' do
    context 'the correctness of a password' do
      it 'is invalid when the email is provided but the user does not exist' do
        expect(described_class.new(email: 'some@email.com', password: 'pass')).not_to be_valid
      end

      it 'is invalid when the password is provided but it is not correct' do
        expect(described_class.new(email: email, password: 'bad password')).not_to be_valid
      end

      it 'is valid when the password is provided and it is correct' do
        expect(described_class.new(email: email, password: actual_password)).to be_valid
      end
    end
  end

  describe '.call' do
    let(:token_resolver) { instance_double(described_class, to_h: nil) }

    before do
      allow(described_class).to receive(:new).and_return(token_resolver)
    end

    specify do
      described_class.call(nil, nil, nil)
      expect(described_class).to have_received(:new)
    end

    specify do
      described_class.call(nil, nil, nil)
      expect(token_resolver).to have_received(:to_h)
    end
  end

  describe '.new' do
    before do
      allow(User).to receive(:find_by).and_call_original
    end

    it 'looks up the user' do
      described_class.new(email: 'email@email.com')
      expect(User).to have_received(:find_by)
    end
  end

  describe '#to_h' do
    context 'when the email and password are correct' do
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:token]).not_to be_nil }
      specify { expect(resolver.to_h[:user]).not_to be_nil }
    end

    context 'when it is invalid' do
      let(:email) { 'someotheremail@example.com' }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:token]).to be_nil }
    end
  end
end
