# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Scalar::DateType, type: :model do
  subject(:type) { described_class }

  describe '.coerce_isolated_input' do
    context 'when the value is date-like' do
      let(:date) { Time.current.to_s }

      specify { expect(type.coerce_isolated_input(date)).to be_a(Time) }
    end

    context 'when the value is a bad date string' do
      let(:date) { 'bad string' }

      specify { expect(type.coerce_isolated_input(date)).to be_nil }
    end

    context 'when the value is nil' do
      let(:date) { nil }

      specify { expect(type.coerce_isolated_input(date)).to be_nil }
    end
  end

  describe '.coerce_isolated_result' do
    context 'when the value is nil' do
      let(:date) { nil }

      specify { expect(type.coerce_isolated_result(date)).to be_nil }
    end

    context 'when the value is a Time' do
      let(:date) { Time.current }

      specify { expect(type.coerce_isolated_result(date)).to eq(date.to_s) }
    end
  end
end
