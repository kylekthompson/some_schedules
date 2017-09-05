# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Helpers::HashCoercer, type: :model do
  subject(:coercer) { described_class.new(ambiguous_param: param) }

  describe '#to_h' do
    context 'when passed a string of valid JSON' do
      let(:param) { '{}' }

      before do
        allow(JSON).to receive(:parse).and_call_original
        allow(described_class).to receive(:new).and_call_original
      end

      it 'parses the string' do
        coercer.to_h
        expect(JSON).to have_received(:parse)
      end

      it 'calls itself with the result of the parsing' do
        coercer.to_h
        expect(described_class).to have_received(:new).exactly(2).times
      end

      it 'returns the correct value' do
        expect(coercer.to_h).to eq({})
      end
    end

    context 'when passed a string of invalid JSON' do
      let(:param) { 'abc' }

      it 'returns an empty hash' do
        expect(coercer.to_h).to eq({})
      end
    end

    context 'when passed a hash' do
      let(:param) { { a: 1 } }

      it 'returns the param' do
        expect(coercer.to_h).to eq(param)
      end
    end

    context 'when passed params' do
      let(:param) { ActionController::Parameters.new(a: 1) }

      it 'returns the param' do
        expect(coercer.to_h).to eq(param)
      end
    end

    context 'when passed nothing' do
      let(:param) { nil }

      it 'returns an empty hash' do
        expect(coercer.to_h).to eq({})
      end
    end

    context 'when passed anything else' do
      let(:param) { 1 }

      it 'raises an argument error' do
        expect { coercer.to_h }.to raise_error(ArgumentError)
      end
    end
  end
end
