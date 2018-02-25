# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tokens::DecodeService, type: :model do
  describe '.decode' do
    context 'when the token is nil' do
      let(:token) { nil }

      it 'is not successful' do
        result = described_class.decode(token: token)
        expect(result.success?).to eq(false)
      end

      it 'returns an error' do
        result = described_class.decode(token: token)
        expect(result.error).to eq(I18n.t!('services.token.decode.missing_token'))
      end
    end

    context 'when the token is not properly signed' do
      let(:token) { JWT.encode({ email: 'email@example.com' }, 'some_secret', 'HS256') }

      it 'is not successful' do
        result = described_class.decode(token: token)
        expect(result.success?).to eq(false)
      end

      it 'returns an error' do
        result = described_class.decode(token: token)
        expect(result.error).to eq(I18n.t!('services.token.decode.error'))
      end
    end

    context 'when the token is valid' do
      let(:user) { build(:user) }
      let(:token) { Tokens::EncodeService.encode(user: user).token }

      it 'is successful' do
        result = described_class.decode(token: token)
        expect(result.success?).to eq(true)
      end

      it 'properly decodes' do
        result = described_class.decode(token: token)
        expect(result.payload.email).to eq(user.email)
      end
    end
  end
end
