# frozen_string_literal: true

if Rails.env.development?
  GraphiQL::Rails.config.headers['Authorization'] = lambda do |context|
    user = User.find_by(id: context.cookies['graphiql_user_id'])
    return nil unless user.present?
    "Bearer #{Knock::AuthToken.new(payload: user.to_token_payload).token}"
  end
end
