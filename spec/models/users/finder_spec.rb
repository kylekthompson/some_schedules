# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Finder, type: :model do
  subject(:finder) { described_class.new(params: params) }

  describe '#find_by_id' do
    let(:user) { create(:user) }
    let(:params) { ActionController::Parameters.new(id: user.id) }

    context 'when the id matches a user' do
      specify { expect(finder.find_by_id.value).to eq(user) }
      specify { expect(finder.find_by_id).to be_success }
    end

    context 'when the id does not match a user' do
      let(:params) { ActionController::Parameters.new(id: user.id + 10_000) }

      specify { expect(finder.find_by_id).to be_failure }
    end
  end
end
