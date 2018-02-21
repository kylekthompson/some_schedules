# frozen_string_literal: true

RSpec.shared_context 'with authenticated headers' do
  let(:current_user) { create(:user) }
  let(:headers) do
    {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Authorization': "Bearer #{Knock::AuthToken.new(payload: current_user.to_token_payload).token}"
    }
  end
end
