# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::SignUpService, type: :model do
  describe '.sign_up' do
    let(:result) { described_class.sign_up(current_user: current_user, params: params) }

    context 'when there is no current_user' do
      let(:current_user) { nil }

      context 'when the params are valid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)) }

        it 'is successful' do
          expect(result.success?).to eq(true)
        end

        it 'returns the user' do
          expect(result.user.first_name).to eq(params[:first_name])
        end

        it 'has the correct status' do
          expect(result.status).to eq(:created)
        end
      end

      context 'when the params are invalid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)).except(:first_name) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'returns the errors' do
          expect(result.errors[:first_name]).not_to be_empty
        end

        it 'has the correct status' do
          expect(result.status).to eq(:unprocessable_entity)
        end
      end
    end

    context 'when the current user is in a company and is not an admin' do
      let(:current_user) { create(:user, :owner) }

      context 'when the params are valid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'has the correct error' do
          expect(result.error).to eq(I18n.t!('services.users.sign_up.unauthorized'))
        end

        it 'has the correct status' do
          expect(result.status).to eq(:forbidden)
        end
      end

      context 'when the params are invalid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)).except(:first_name) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'has the correct error' do
          expect(result.error).to eq(I18n.t!('services.users.sign_up.unauthorized'))
        end

        it 'has the correct status' do
          expect(result.status).to eq(:forbidden)
        end
      end
    end

    context 'when the current user is in a company and is an admin' do
      let(:current_user) { create(:user, :owner, :admin) }

      context 'when the params are valid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)) }

        it 'is successful' do
          expect(result.success?).to eq(true)
        end

        it 'returns the user' do
          expect(result.user.first_name).to eq(params[:first_name])
        end

        it 'has the correct status' do
          expect(result.status).to eq(:created)
        end
      end

      context 'when the params are invalid' do
        let(:params) { attributes_for(:user).merge(company: create(:company)).except(:first_name) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'returns the errors' do
          expect(result.errors[:first_name]).not_to be_empty
        end

        it 'has the correct status' do
          expect(result.status).to eq(:unprocessable_entity)
        end
      end
    end
  end
end
