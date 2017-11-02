# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Shift::Creator, type: :model do
  subject(:resolver) { described_class.new(arguments) }

  let(:arguments) { attributes_for(:shift).merge(user_id: user_id) }
  let(:user_id) { create(:user).id }

  describe '.call' do
    let(:token_resolver) { instance_double(described_class, to_h: nil) }

    before do
      allow(described_class).to receive(:new).and_return(token_resolver)
    end

    specify do
      described_class.call(nil, nil, nil)
      expect(described_class).to have_received(:new)
    end

    specify do
      described_class.call(nil, nil, nil)
      expect(token_resolver).to have_received(:to_h)
    end
  end

  describe '#to_h' do
    context 'when everything is correct' do
      specify { expect { resolver.to_h }.to change { Shift.count }.by(1) }
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:shift]).not_to be_nil }

      it 'assigns the shift to the correct user' do
        expect(resolver.to_h[:shift].user).to eq(User.find(user_id))
      end
    end

    context 'when it is invalid' do
      let(:user_id) { nil }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:token]).to be_nil }
    end
  end
end
