# frozen_string_literal: true

module Resolvers
  module Type
    KNOWN_TYPES = %w[User Company CompanyUser].freeze

    class << self
      def call(_type, obj, _ctx)
        raise_unknown_type(obj) unless KNOWN_TYPES.include?(obj.class.name)
        Types::Object.const_get("#{obj.class.name}Type")
      end

      private

      def raise_unknown_type(obj)
        raise ArgumentError, "Don't know how to get the GraphQL type of a #{obj.class.name} (#{obj.inspect})"
      end
    end
  end
end