# frozen_string_literal: true

module Resolvers
  module User
    module Token
      class << self
        def call(_obj, args, _ctx)
          { token: token_for_args(args[:email], args[:password]) }
        end

        private

        def token_for_args(email, password)
          return nil unless email.present?
          user = ::User.find_by(email: email) || ::User.new(password: "#{password}-invalid")
          return token(user) if user.authenticate(password)
          nil
        end

        def token(user)
          Knock::AuthToken.new(payload: user.to_token_payload).token
        end
      end
    end
  end
end
