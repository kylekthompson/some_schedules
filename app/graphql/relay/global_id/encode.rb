# frozen_string_literal: true

module Relay
  module GlobalID
    module Encode
      def self.call(object, type_def, _ctx)
        GraphQL::Schema::UniqueWithinType.encode(type_def.name, object.id)
      end
    end
  end
end
