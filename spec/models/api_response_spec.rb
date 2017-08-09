# frozen_string_literal: true

require 'rails_helper'

RSpec.describe APIResponse, type: :model do
  subject(:api_response) { described_class.new(status: status, errors: errors, value: value) }
  let(:errors) { [] }
  let(:value) { nil }

  describe '.new' do
    context 'when passed a rack http status symbol' do
      Rack::Utils::SYMBOL_TO_STATUS_CODE.keys.each do |status_code|
        specify { expect { described_class.new(status: status_code) }.not_to raise_error }
      end
    end

    context 'when passed anything else' do
      specify do
        expect { described_class.new(status: 'status_code') }
          .to raise_error(described_class::BadStatusError)
      end
    end
  end

  describe '#success?' do
    context 'when the status code is successful' do
      let(:status) { :created }

      specify { expect(api_response.success?).to be(true) }
    end

    context 'when the status code is not successful' do
      let(:status) { :unauthorized }

      specify { expect(api_response.success?).to be(false) }
    end
  end

  describe '#failure?' do
    context 'when the status code is successful' do
      let(:status) { :created }

      specify { expect(api_response.failure?).to be(false) }
    end

    context 'when the status code is not successful' do
      let(:status) { :unauthorized }

      specify { expect(api_response.failure?).to be(true) }
    end
  end
end
