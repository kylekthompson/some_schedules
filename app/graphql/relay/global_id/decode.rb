# frozen_string_literal: true

module Relay
  module GlobalID
    module Decode
      def self.call(global_id, _ctx)
        type, id = GraphQL::Schema::UniqueWithinType.decode(global_id)
        type.constantize.find(id)
      end
    end
  end
end
