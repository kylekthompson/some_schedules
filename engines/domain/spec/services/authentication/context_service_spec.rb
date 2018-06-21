# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authentication::ContextService, type: :model do
  describe '.build' do
    let(:result) { described_class.build(user: user) }

    context 'when the user is nil' do
      let(:user) { nil }

      it 'is successful' do
        expect(result.success?).to eq(true)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:ok)
      end

      it 'has no error' do
        expect(result.error).to be_nil
      end

      it 'has the context' do
        expect(result.context).not_to be_nil
      end
    end

    context 'when the user is not nil' do
      let(:user) { build(:user) }

      it 'is successful' do
        expect(result.success?).to eq(true)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:ok)
      end

      it 'has no error' do
        expect(result.error).to be_nil
      end

      it 'has the context' do
        expect(result.context).not_to be_nil
      end
    end
  end
end
