# frozen_string_literal: true

module Authentication
  module Tokens
    class EncodeService < Core::Service
      static_facade :encode, [:user!]

      def encode
        return nil unless user.persisted?

        JWT.encode(payload, secret_key_base, ALGORITHM)
      end

      private

      def payload
        { email: user.email }
      end

      def secret_key_base
        Rails.application.secrets.secret_key_base
      end
    end
  end
end
