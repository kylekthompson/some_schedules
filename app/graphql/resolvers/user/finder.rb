# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(_user, args, _ctx)
          return ::User.where(id: args[:ids]) if args[:ids]
          ::User.find_by(id: args[:id])
        end
      end
    end
  end
end
