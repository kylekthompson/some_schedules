# frozen_string_literal: true

RSpec.shared_context 'with unauthenticated headers' do
  let(:current_user) { nil }
  let(:headers) do
    {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json'
    }
  end
end
