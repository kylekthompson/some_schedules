# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shifts::CreationService, type: :model do
  describe '.create' do
    let(:result) { described_class.create(current_user: current_user, params: params) }
    let(:user_for_shift) { create(:user) }

    context 'when there is no current_user' do
      let(:current_user) { nil }
      let(:params) { attributes_for(:shift).merge(user_id: user_for_shift.id) }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'returns the errors' do
        expect(result.error).to eq(I18n.t!('services.shifts.creation.unauthorized'))
      end

      it 'has the correct status' do
        expect(result.status).to eq(:forbidden)
      end
    end

    context 'when the current user can create the shift with the given params' do
      include_context 'with stubbed policies'

      let(:shift_policy) { instance_double(ShiftPolicy, can_create?: true) }
      let(:current_user) { create(:user, :owner) }

      context 'when the params are valid' do
        let(:params) { attributes_for(:shift).merge(user_id: user_for_shift.id) }

        it 'is successful' do
          expect(result.success?).to eq(true)
        end

        it 'returns the shift', :aggregate_failures do
          expect(result.shift.end_time).to eq(params[:end_time])
          expect(result.shift.start_time).to eq(params[:start_time])
          expect(result.shift.user).to eq(user_for_shift)
        end

        it 'has the correct status' do
          expect(result.status).to eq(:created)
        end
      end

      context 'when the params are invalid' do
        let(:params) { attributes_for(:shift).merge(user_id: user_for_shift.id).except(:end_time) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'has the correct error' do
          expect(result.errors[:end_time]).not_to be_empty
        end

        it 'has the correct status' do
          expect(result.status).to eq(:unprocessable_entity)
        end
      end
    end

    context 'when the current user cannot create the shift with the given params' do
      include_context 'with stubbed policies'

      let(:shift_policy) { instance_double(ShiftPolicy, can_create?: false) }
      let(:current_user) { create(:user, :owner) }
      let(:params) { attributes_for(:shift).merge(user_id: user_for_shift.id) }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'returns the errors' do
        expect(result.error).to eq(I18n.t!('services.shifts.creation.unauthorized'))
      end

      it 'has the correct status' do
        expect(result.status).to eq(:forbidden)
      end
    end
  end
end
