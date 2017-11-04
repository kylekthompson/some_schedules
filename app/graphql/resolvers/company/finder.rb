# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          return Batch::RecordLoader.for(::Company).load(object.company_id) if object.respond_to?(:company_id)
          Batch::RecordLoader.for(::Company, lookup_column: :slug).load(arguments[:slug]) if arguments[:slug].present?
        end
      end
    end
  end
end
