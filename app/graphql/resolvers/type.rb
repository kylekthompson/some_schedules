# frozen_string_literal: true

module Resolvers
  module Type
    class << self
      ##
      # Resolves an instance of an object to the correct GraphQL Type
      #
      # [1] pry(main)> Resolvers::Type.call(nil, User.first, nil)
      # => Types::Object::UserType
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
