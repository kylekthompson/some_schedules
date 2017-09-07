# frozen_string_literal: true

module Resolvers
  module User
    module Token
      class << self
        def call(obj, args, ctx)
          return token(obj) if obj.present? && ctx[:current_user]&.id == obj.id
          return token(obj) if obj.present? && password_matches_obj?(obj, args[:password])
          return token_for_args(args[:email], args[:password]) if args[:email].present?
          nil
        end

        private

        def token_for_args(email, password)
          return nil unless email.present?
          user = ::User.find_by(email: email)
          return token(user) if user&.authenticate(password)
          nil
        end

        def token(user)
          Knock::AuthToken.new(payload: user.to_token_payload).token
        end

        def password_matches_obj?(user, password)
          return false unless user.present?
          return true if user.authenticate(password)
          false
        end
      end
    end
  end
end
