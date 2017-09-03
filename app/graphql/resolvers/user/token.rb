# frozen_string_literal: true

module Resolvers
  module User
    module Token
      class << self
        def call(obj, args, ctx)
          return token(obj) if ctx[:current_user]&.id == obj.id
          return token(obj) if password_is_correct(obj, args[:password])
          nil
        end

        private

        def token(user)
          Knock::AuthToken.new(payload: user.to_token_payload).token
        end

        def password_is_correct(user, password)
          return false unless user.present?
          return true if user.authenticate(password)
          false
        end
      end
    end
  end
end
