# frozen_string_literal: true

RSpec.shared_context 'with shared execution setup' do
  let(:data) { execution_result[:data] }
  let(:errors) { execution_result[:errors] }
end
