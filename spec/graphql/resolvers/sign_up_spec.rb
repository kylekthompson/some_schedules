# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::SignUp, type: :model do
  subject(:resolver) { described_class.new(args) }

  let(:company_attributes) { attributes_for(:company) }
  let(:user_attributes) { attributes_for(:user) }
  let(:current_user) { nil }
  let(:args) do
    {
      company: company_attributes,
      user: user_attributes,
      current_user: current_user
    }
  end

  it { is_expected.to validate_presence_of(:company_params) }
  it { is_expected.to validate_presence_of(:user_params) }

  describe 'validations' do
    context 'when signed in' do
      let(:current_user) { build(:user) }

      specify { expect(resolver).not_to be_valid }
    end

    context 'when signed out' do
      let(:current_user) { nil }

      specify { expect(resolver).to be_valid }
    end
  end

  describe '.call' do
    let(:company_resolver) { instance_double(described_class, to_h: nil) }

    before do
      allow(described_class).to receive(:new).and_return(company_resolver)
    end

    specify do
      described_class.call(nil, {}, {})
      expect(described_class).to have_received(:new)
    end

    specify do
      described_class.call(nil, {}, {})
      expect(company_resolver).to have_received(:to_h)
    end
  end

  describe '#to_h' do
    context 'when company is not valid' do
      let(:company_attributes) { attributes_for(:company).tap { |c| c[:slug] = nil } }

      specify { expect(resolver.to_h[:company_errors]).not_to be_nil }
      specify { expect(resolver.to_h[:company]).to be_nil }
    end

    context 'when user is not valid' do
      let(:user_attributes) { attributes_for(:user).tap { |u| u[:email] = nil } }

      specify { expect(resolver.to_h[:user_errors]).not_to be_nil }
      specify { expect(resolver.to_h[:user]).to be_nil }
      specify { expect(resolver.to_h[:token]).to be_nil }
    end

    context 'when everything is valid' do
      specify { expect { resolver.to_h }.to change { Company.count }.by(1) }
      specify { expect { resolver.to_h }.to change { User.count }.by(1) }
      specify { expect(resolver.to_h[:company_errors]).to be_nil }
      specify { expect(resolver.to_h[:user_errors]).to be_nil }
      specify { expect(resolver.to_h[:company]).not_to be_nil }
      specify { expect(resolver.to_h[:user]).not_to be_nil }
      specify { expect(resolver.to_h[:token]).not_to be_nil }

      it 'sets the role of the new user to owner' do
        user = resolver.to_h[:user]
        expect(user.role).to eq('owner')
      end

      it 'sets the company of the new user to the created company' do
        result = resolver.to_h
        expect(result[:user].company).to eq(result[:company])
      end
    end
  end
end
