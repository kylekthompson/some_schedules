# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authentication::SignInService, type: :model do
  describe '.sign_in' do
    context 'when the email is nil' do
      it 'is not successful' do
        result = described_class.sign_in(email: nil, password: 'password')
        expect(result.success?).to eq(false)
      end

      it 'has the correct error' do
        result = described_class.sign_in(email: nil, password: 'password')
        expect(result.error).to eq(I18n.t!('services.authentication.sign_in.missing_email'))
      end
    end

    context 'when the password is nil' do
      it 'is not successful' do
        result = described_class.sign_in(email: 'some@email.com', password: nil)
        expect(result.success?).to eq(false)
      end

      it 'has the correct error' do
        result = described_class.sign_in(email: 'some@email.com', password: nil)
        expect(result.error).to eq(I18n.t!('services.authentication.sign_in.missing_password'))
      end
    end

    context 'when a user does not exist' do
      it 'is not successful' do
        result = described_class.sign_in(email: 'some@email.com', password: 'password')
        expect(result.success?).to eq(false)
      end

      it 'has the correct error' do
        result = described_class.sign_in(email: 'some@email.com', password: 'password')
        expect(result.error).to eq(I18n.t!('services.authentication.sign_in.not_found'))
      end
    end

    context 'when a user exists but the password is incorrect' do
      let!(:user) { create(:user, password: 'password') }

      it 'is not successful' do
        result = described_class.sign_in(email: user.email, password: 'wrong_password')
        expect(result.success?).to eq(false)
      end

      it 'has the correct error' do
        result = described_class.sign_in(email: user.email, password: 'wrong_password')
        expect(result.error).to eq(I18n.t!('services.authentication.sign_in.not_found'))
      end
    end

    context 'when a user exists and the password is correct' do
      let!(:user) { create(:user, password: 'password') }

      it 'is successful' do
        result = described_class.sign_in(email: user.email, password: user.password)
        expect(result.success?).to eq(true)
      end

      it 'returns the authentication context' do
        result = described_class.sign_in(email: user.email, password: user.password)
        expect(result.authentication_context.role).to eq(user.role)
      end

      it 'returns a token' do
        result = described_class.sign_in(email: user.email, password: user.password)
        decoded_token = Token::DecodeService.decode(token: result.token)
        expect(decoded_token.payload.email).to eq(user.email)
      end
    end
  end
end
