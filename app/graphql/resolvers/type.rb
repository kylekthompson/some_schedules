# frozen_string_literal: true

module Resolvers
  module Type
    KNOWN_TYPES = %w[User Company CompanyUser].freeze

    class << self
      def call(_type, object, _context)
        raise_unknown_type(object) unless KNOWN_TYPES.include?(object.class.name)
        Types::Object.const_get("#{object.class.name}Type")
      end

      private

      def raise_unknown_type(object)
        raise ArgumentError, "Don't know how to get the GraphQL type of a #{object.class.name} (#{object.inspect})"
      end
    end
  end
end
