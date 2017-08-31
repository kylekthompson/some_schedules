# frozen_string_literal: true

module Relay
  module TypeResolver
    def self.call(obj, _ctx)
      case obj
      when User
        Types::Objects::UserType
      else
        raise "Don't know how to get the GraphQL type of a #{obj.class.name} (#{obj.inspect})"
      end
    end
  end
end
