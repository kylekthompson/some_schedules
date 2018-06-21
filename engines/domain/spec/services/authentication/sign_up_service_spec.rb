# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authentication::SignUpService, type: :model do
  describe '.sign_up' do
    let(:current_user) { nil }
    let(:result) { described_class.sign_up(company: company_params, current_user: current_user, user: user_params) }

    context 'when the company params are valid' do
      let(:company_params) { attributes_for(:company) }

      context 'when the user params are valid' do
        let(:user_params) { attributes_for(:user) }

        it 'is successful' do
          expect(result.success?).to eq(true)
        end

        it 'returns the authentication context' do
          expect(result.authentication_context.is_signed_in).to eq(true)
        end

        it 'has the correct status' do
          expect(result.status).to eq(:created)
        end

        it 'properly creates the user', :aggregate_failures do
          expect(result.user.company).to eq(result.company)
          expect(result.user.email).to eq(user_params[:email])
          expect(result.user.role).to eq('owner')
        end

        it 'creates the company' do
          expect(result.company.slug).to eq(company_params[:slug])
        end

        it 'returns a token' do
          decoded_token = Tokens::DecodeService.decode(token: result.token)
          expect(decoded_token.payload.email).to eq(result.user.email)
        end
      end

      context 'when the user params are invalid' do
        let(:user_params) { attributes_for(:user).except(:first_name) }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'returns the errors' do
          expect(result.errors[:user][:first_name]).not_to be_empty
        end

        it 'has the correct status' do
          expect(result.status).to eq(:unprocessable_entity)
        end
      end
    end

    context 'when the company params are invalid' do
      let(:company_params) { attributes_for(:company).except(:name) }
      let(:user_params) { attributes_for(:user) }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'returns the errors' do
        expect(result.errors[:company][:name]).not_to be_empty
      end

      it 'has the correct status' do
        expect(result.status).to eq(:unprocessable_entity)
      end
    end
  end
end
