# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(object, arguments, context)
          raise GraphQL::ExecutionError, 'Authentication required.' unless context[:current_user].present?
          return Batch::RecordLoader.for(::Company).load(object.company_id) if object.respond_to?(:company_id)
          Batch::RecordLoader.for(::Company, lookup_column: :slug).load(arguments[:slug]) if arguments[:slug].present?
        end
      end
    end
  end
end
