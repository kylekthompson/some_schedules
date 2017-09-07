# frozen_string_literal: true

module Resolvers
  module User
    module Token
      class << self
        def call(user, args, ctx)
          return handle_token_for_user(user, ctx[:current_user], args[:email], args[:password]) if user.present?
          handle_token_for_args(args[:email], args[:password])
        end

        private

        def handle_token_for_user(user, current_user, email, password)
          return token(user) if current_user&.id == user.id
          return token(user) if password_matches_user?(user, password)
          handle_token_for_args(email, password)
        end

        def handle_token_for_args(email, password)
          return nil unless email.present?
          user = ::User.find_by(email: email)
          return token(user) if user&.authenticate(password)
          nil
        end

        def password_matches_user?(user, password)
          return false unless user.present?
          return true if user.authenticate(password)
          false
        end

        def token(user)
          Knock::AuthToken.new(payload: user.to_token_payload).token
        end
      end
    end
  end
end
