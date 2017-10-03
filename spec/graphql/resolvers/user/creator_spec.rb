# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Creator, type: :model do
  subject(:resolver) { described_class.new(args) }

  let(:args) { attributes_for(:user) }

  it { is_expected.to validate_presence_of(:params) }

  describe '.call' do
    let(:user_resolver) { instance_double(described_class, to_h: nil) }

    before do
      allow(described_class).to receive(:new).and_return(user_resolver)
    end

    specify do
      described_class.call(nil, {}, {})
      expect(described_class).to have_received(:new)
    end

    specify do
      described_class.call(nil, {}, {})
      expect(user_resolver).to have_received(:to_h)
    end
  end

  describe '#to_h' do
    context 'when something is missing' do
      let(:args) { super().tap { |attrs| attrs[:first_name] = nil } }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:user]).to be_nil }
    end

    context 'when everything is valid' do
      specify { expect { resolver.to_h }.to change { User.count }.by(1) }
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:user]).not_to be_nil }
    end
  end
end
