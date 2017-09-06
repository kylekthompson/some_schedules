# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(_obj, args, _ctx)
          return ::Company.where(id: args[:ids]) if args[:ids]
          ::Company.find_by(id: args[:id])
        end
      end
    end
  end
end
