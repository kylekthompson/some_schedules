# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authentication::ContextSerializer, type: :serializer do
  subject(:serializer) { described_class.new(context) }

  describe 'serialization' do
    let(:context) { Authentication::Context.new(user: user) }

    context 'when the user is nil' do
      let(:user) { nil }

      it 'serializes properly' do
        expect(serializer.serializable_hash).to include(
          is_admin: false,
          is_signed_in: false,
          role: nil
        )
      end
    end

    context 'when the user is not nil' do
      let(:user) { build(:user) }

      it 'serializes properly' do
        expect(serializer.serializable_hash).to include(
          is_admin: user.admin?,
          is_signed_in: true,
          role: user.role
        )
      end
    end
  end
end
