# frozen_string_literal: true

module Resolvers
  module Type
    class << self
      def call(_type, object, _context)
        Types::Object.const_get("#{object.class.name}Type")
      rescue NameError
        raise_unknown_type(object)
      end

      private

      def raise_unknown_type(object)
        raise ArgumentError, "Don't know how to get the GraphQL type of a #{object.class.name} (#{object.inspect})"
      end
    end
  end
end
