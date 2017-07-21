# frozen_string_literal: true

def authenticated_headers(user: FactoryGirl.create(:user))
  {
    'CONTENT_TYPE' => 'application/json',
    'ACCEPT' => 'application/json',
    'Authorization': "Bearer #{Knock::AuthToken.new(payload: user.to_token_payload).token}"
  }
end

def unauthenticated_headers
  {
    'CONTENT_TYPE' => 'application/json',
    'ACCEPT' => 'application/json'
  }
end
