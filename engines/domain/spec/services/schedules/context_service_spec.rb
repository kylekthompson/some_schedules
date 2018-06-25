# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Schedules::ContextService, type: :model do
  describe '.build' do
    let(:result) { described_class.build(user: user, after: after, before: before) }
    let(:user) { create(:user) }

    context 'when before is nil' do
      let(:after) { 1.day.ago.to_s }
      let(:before) { nil }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:unprocessable_entity)
      end

      it 'has the correct error' do
        expect(result.error).to eq(I18n.t!('services.schedules.context.missing_param', param: :before))
      end
    end

    context 'when after is nil' do
      let(:after) { nil }
      let(:before) { 1.day.from_now.to_s }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:unprocessable_entity)
      end

      it 'has the correct error' do
        expect(result.error).to eq(I18n.t!('services.schedules.context.missing_param', param: :after))
      end
    end

    context 'when after is not earlier than before' do
      let(:after) { 2.days.from_now.to_s }
      let(:before) { 1.day.from_now.to_s }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:unprocessable_entity)
      end

      it 'has the correct error' do
        expect(result.error).to eq(I18n.t!('services.schedules.context.after_must_be_earlier_than_before'))
      end
    end

    context 'when after or before is not a valid time string' do
      let(:after) { 'not a time' }
      let(:before) { 1.day.from_now.to_s }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:unprocessable_entity)
      end

      it 'has the correct error' do
        expect(result.error).to eq(I18n.t!('services.schedules.context.missing_param', param: :after))
      end
    end

    context 'when after and before are valid time strings' do
      let(:after) { 1.days.ago.to_s }
      let(:before) { 1.day.from_now.to_s }

      it 'is successful' do
        expect(result.success?).to eq(true)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:ok)
      end

      it 'has no error' do
        expect(result.error).to be_nil
      end

      it 'returns the context' do
        expect(result.context).to be_a(Schedules::Context)
      end
    end

    context 'when after and before are valid times' do
      let(:after) { 1.days.ago }
      let(:before) { 1.day.from_now }

      it 'is successful' do
        expect(result.success?).to eq(true)
      end

      it 'has the correct status' do
        expect(result.status).to eq(:ok)
      end

      it 'has no error' do
        expect(result.error).to be_nil
      end

      it 'returns the context' do
        expect(result.context).to be_a(Schedules::Context)
      end
    end
  end
end
