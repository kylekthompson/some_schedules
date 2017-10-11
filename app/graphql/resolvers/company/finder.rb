# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(obj, args, _ctx)
          return obj.company if obj.respond_to?(:company)
          ::Company.find_by(slug: args[:slug]) if args[:slug].present?
        end
      end
    end
  end
end
