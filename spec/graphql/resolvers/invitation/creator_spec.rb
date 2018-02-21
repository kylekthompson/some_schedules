# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Invitation::Creator, type: :model do
  subject(:resolver) { described_class.new(arguments) }

  let(:arguments) { { current_user: current_user, email: email } }
  let(:current_user) { create(:user) }
  let(:email) { FFaker::Internet.email }

  describe '.call' do
    let(:resolver) { instance_double(described_class, to_h: nil) }
    let(:object) { nil }
    let(:arguments) { {} }
    let(:context) { { current_user: current_user } }

    before do
      allow(described_class).to receive(:new).and_return(resolver)
    end

    context 'when there is a current user' do
      let(:current_user) { create(:user) }

      specify do
        described_class.call(object, arguments, context)
        expect(described_class).to have_received(:new)
      end

      specify do
        described_class.call(object, arguments, context)
        expect(resolver).to have_received(:to_h)
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
      specify { expect { resolver.to_h }.to change(current_user.invitations, :count).by(1) }
      specify { expect(resolver.to_h[:errors]).to be_nil }
      specify { expect(resolver.to_h[:invitation]).not_to be_nil }

      it 'creates the invitation with the correct attributes' do
        expect(resolver.to_h[:invitation].email).to eq(email)
      end
    end

    context 'when not authorized to create the shift' do
      let(:invitation_policy) { instance_double(InvitationPolicy, can_invite?: false) }

      it 'raises an authorization error' do
        expect { resolver.to_h }.to raise_error(GraphQL::ExecutionError, /auth/i)
      end
    end

    context 'when it is invalid' do
      let(:email) { nil }

      specify { expect(resolver.to_h[:errors]).not_to be_nil }
      specify { expect(resolver.to_h[:invitation]).to be_nil }
    end
  end
end
