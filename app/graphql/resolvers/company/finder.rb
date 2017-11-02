# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(obj, args, _ctx)
          return Batch::RecordLoader.for(::Company).load(obj.company_id) if obj.respond_to?(:company_id)
          Batch::RecordLoader.for(::Company, lookup_column: :slug).load(args[:slug]) if args[:slug].present?
        end
      end
    end
  end
end
