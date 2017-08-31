# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      def self.call(_obj, args, _ctx)
        ::User.find(args[:id])
      end
    end
  end
end
