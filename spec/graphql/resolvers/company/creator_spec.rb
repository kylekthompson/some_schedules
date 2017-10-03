# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Creator, type: :model do
  subject(:resolver) { described_class.new(args) }

  let(:args) { { name: name, slug: slug, user: user } }
  let(:name) { 'name' }
  let(:slug) { 'slug' }
  let(:user) { create(:user) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:slug) }

  describe 'validating' do
    context 'authentication' do
      let(:user) { build(:user) }

      it 'is invalid when there is no user' do
        expect(described_class.new(name: 'name', slug: 'slug', user: nil)).not_to be_valid
      end

      it 'is valid when there is a user' do
        expect(described_class.new(name: 'name', slug: 'slug', user: user)).to be_valid
      end
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
    context 'when the name or slug is missing' do
      let(:slug) { nil }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:company]).to be_nil }
    end

    context 'when user is missing' do
      let(:user) { nil }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:company]).to be_nil }
    end

    context 'when company is not valid' do
      before { create(:company, slug: slug) }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:company]).to be_nil }
    end

    context 'when everything is valid' do
      specify { expect { resolver.to_h }.to change { Company.count }.by(1) }
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:company]).not_to be_nil }

      it 'adds the current user to the company as an owner' do
        company = resolver.to_h[:company]
        expect(company.company_users.first.role).to eq('owner')
      end
    end
  end
end
