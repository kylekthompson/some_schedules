# frozen_string_literal: true

json.id user.id
json.first_name user.first_name
json.last_name user.last_name
json.email user.email
json.token Knock::AuthToken.new(payload: user.to_token_payload).token
