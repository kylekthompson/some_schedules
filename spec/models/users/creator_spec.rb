# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Creator, type: :model do
  subject(:creator) { described_class.new(params: params) }

  describe '#create' do
    let(:params) { ActionController::Parameters.new(user: attributes_for(:user)) }

    context 'when the params are valid' do
      specify { expect { creator.create }.to change { User.count }.by(1) }
      specify { expect(creator.create).to be_success }
    end

    context 'when the params are not valid' do
      let(:params) do
        ActionController::Parameters.new(user: attributes_for(:user).tap { |u| u[:email] = nil })
      end

      specify { expect { creator.create }.not_to(change { User.count }) }
      specify { expect(creator.create).to be_failure }
    end
  end
end
