# frozen_string_literal: true

RSpec.shared_context 'shared_execution_setup' do
  let(:data) { execution_result[:data] }
  let(:errors) { execution_result[:errors] }
end
