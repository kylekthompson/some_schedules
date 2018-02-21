# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Token::EncodeService, type: :model do
  describe '.encode' do
    context 'when the user is nil' do
      let(:user) { nil }

      it 'is not successful' do
        result = described_class.encode(user: user)
        expect(result.success?).to eq(false)
      end

      it 'returns an error' do
        result = described_class.encode(user: user)
        expect(result.error).to eq(I18n.t!('services.token.encode.missing_user'))
      end
    end

    context 'when the user is passed' do
      let(:user) { build(:user) }

      it 'is successful' do
        result = described_class.encode(user: user)
        expect(result.success?).to eq(true)
      end

      it 'returns a valid token for that user' do
        encode_result = described_class.encode(user: user)
        decode_result = Token::DecodeService.decode(token: encode_result.token)
        expect(decode_result.success?).to eq(true)
      end
    end
  end
end
