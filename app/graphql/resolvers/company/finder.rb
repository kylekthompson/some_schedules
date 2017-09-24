# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(_company, args, _ctx)
          ::Company.find_by(slug: args[:slug]) if args[:slug].present?
        end
      end
    end
  end
end
