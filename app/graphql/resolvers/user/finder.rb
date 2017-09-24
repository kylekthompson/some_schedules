# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(_user, args, _ctx)
          ::User.find_by(id: args[:id]) if args[:id].present?
        end
      end
    end
  end
end
