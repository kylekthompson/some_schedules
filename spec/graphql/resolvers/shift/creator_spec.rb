# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Shift::Creator, type: :model do
  subject(:resolver) { described_class.new(arguments) }

  let(:arguments) { attributes_for(:shift).merge(user_id: user_id) }
  let(:user) { create(:user) }
  let(:user_id) { user.id }

  describe '.call' do
    let(:token_resolver) { instance_double(described_class, to_h: nil) }
    let(:object) { nil }
    let(:arguments) { {} }
    let(:context) { { current_user: current_user } }

    before do
      allow(described_class).to receive(:new).and_return(token_resolver)
    end

    context 'when there is a current user' do
      let(:current_user) { user }

      specify do
        described_class.call(object, arguments, context)
        expect(described_class).to have_received(:new)
      end

      specify do
        described_class.call(object, arguments, context)
        expect(token_resolver).to have_received(:to_h)
      end
    end

    context 'when there is no current user' do
      let(:current_user) { nil }

      specify { expect { described_class.call(object, arguments, context) }.to raise_error(GraphQL::ExecutionError) }
    end
  end

  describe '#to_h' do
    include_context 'with stubbed policies'

    context 'when everything is correct' do
      specify { expect { resolver.to_h }.to change(Shift, :count).by(1) }
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:shift]).not_to be_nil }

      it 'assigns the shift to the correct user' do
        expect(resolver.to_h[:shift].user).to eq(User.find(user_id))
      end
    end

    context 'when not authorized to create the shift' do
      let(:shift_policy) { instance_double(ShiftPolicy, can_create?: false) }

      it 'raises an authorization error' do
        expect { resolver.to_h }.to raise_error(GraphQL::ExecutionError, /auth/i)
      end
    end

    context 'when it is invalid' do
      let(:user_id) { nil }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:token]).to be_nil }
    end
  end
end
