# frozen_string_literal: true

module Authentication
  module Tokens
    class EncodeService < Core::Service
      def self.encode(user:)
        new(user: user || NilUser.new)
      end

      attr_reader :user

      def initialize(user:)
        @user = user
      end

      def success?
        user.persisted? && token.present?
      end

      def token
        @token ||= JWT.encode(payload, secret_key_base, ALGORITHM)
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
