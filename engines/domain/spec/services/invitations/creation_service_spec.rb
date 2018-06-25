# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Invitations::CreationService, type: :model do
  describe '.create' do
    let(:result) { described_class.create(current_user: current_user, email: email) }

    context 'when there is no current_user' do
      let(:current_user) { nil }
      let(:email) { 'some@email.com' }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'returns the errors' do
        expect(result.error).to eq(I18n.t!('services.invitations.creation.unauthorized', email: email))
      end

      it 'has the correct status' do
        expect(result.status).to eq(:forbidden)
      end
    end

    context 'when the current user is an employee' do
      let(:current_user) { create(:user, :employee) }
      let(:email) { 'some@example.com' }

      it 'is not successful' do
        expect(result.success?).to eq(false)
      end

      it 'has the correct error' do
        expect(result.error).to eq(I18n.t!('services.invitations.creation.unauthorized', email: email))
      end

      it 'has the correct status' do
        expect(result.status).to eq(:forbidden)
      end
    end

    context 'when the current user is an owner or manager' do
      let(:current_user) { create(:user, :owner) }

      context 'when the email is valid' do
        let(:email) { 'some@email.com' }

        it 'is successful' do
          expect(result.success?).to eq(true)
        end

        it 'returns the invitation' do
          expect(result.invitation.email).to eq(email)
        end

        it 'has the correct status' do
          expect(result.status).to eq(:created)
        end
      end

      context 'when the email is invalid' do
        let(:email) { 'not_an_email' }

        it 'is not successful' do
          expect(result.success?).to eq(false)
        end

        it 'returns the errors' do
          expect(result.errors[:email]).not_to be_empty
        end

        it 'has the correct status' do
          expect(result.status).to eq(:unprocessable_entity)
        end
      end
    end
  end
end
