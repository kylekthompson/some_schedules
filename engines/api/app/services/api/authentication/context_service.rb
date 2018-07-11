# frozen_string_literal: true

module API
  module Authentication
    class ContextService < Core::Service
      def self.build(params)
        new(params)
      end

      include API::Serialization

      def initialize(user:)
        @user = user
      end

      def status
        :ok
      end

      def serialize
        { context: serialized(context) }
      end

      private

      attr_reader :user

      def context
        @context ||= Authentication::Context.new(user: user)
      end
    end
  end
end
