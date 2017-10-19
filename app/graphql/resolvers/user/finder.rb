# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(_obj, args, _ctx)
          ::User.includes(company: { users: :shifts }).find_by(id: args[:id]) if args[:id].present?
        end
      end
    end
  end
end
