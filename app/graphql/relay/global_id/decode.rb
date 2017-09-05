# frozen_string_literal: true

module Relay
  module GlobalID
    module Decode
      def self.call(global_id, ctx)
        type, id = GraphQL::Schema::UniqueWithinType.decode(global_id)
        Resolvers.const_get(type)::Finder.call(nil, { id: id }, ctx)
      end
    end
  end
end
