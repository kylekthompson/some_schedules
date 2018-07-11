# frozen_string_literal: true

module Authentication
  module Tokens
    class DecodeService < Core::Service
      def self.decode(params)
        new(params)
      end

      VALIDATE = true
      DECODE_OPTIONS = { algorithm: ALGORITHM }.freeze

      attr_reader :token

      def initialize(token:)
        @token = token
      end

      def success?
        payload.present?
      end

      def payload
        JWT.decode(token, secret_key_base, VALIDATE, DECODE_OPTIONS).first
      rescue JWT::DecodeError
        {}
      end

      def email
        payload.symbolize_keys.fetch(:email, nil)
      end

      private

      def secret_key_base
        Rails.application.secrets.secret_key_base
      end
    end
  end
end
