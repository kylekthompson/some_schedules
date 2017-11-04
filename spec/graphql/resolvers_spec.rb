# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers, type: :model do
  subject(:resolvers) { described_class }

  describe '.require_authentication!' do
    let(:context) { { current_user: current_user } }

    context 'when there is a current user' do
      let(:current_user) { build(:user) }

      specify { expect { resolvers.require_authentication!(context) }.not_to raise_error }
    end

    context 'when there is not a current user' do
      let(:current_user) { nil }

      specify { expect { resolvers.require_authentication!(context) }.to raise_error(GraphQL::ExecutionError) }
    end
  end
end
