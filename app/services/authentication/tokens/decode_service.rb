# frozen_string_literal: true

module Authentication
  module Tokens
    class DecodeService < Core::Service
      VALIDATE = true
      DECODE_OPTIONS = { algorithm: ALGORITHM }.freeze

      static_facade :decode, [:token!]

      def decode
        return nil unless token.present?

        Authentication::Token::Payload.new(token_payload.symbolize_keys)
      end

      private

      def token_payload
        JWT.decode(token, secret_key_base, VALIDATE, DECODE_OPTIONS).first
      rescue JWT::DecodeError
        {}
      end

      def secret_key_base
        Rails.application.secrets.secret_key_base
      end
    end
  end
end
