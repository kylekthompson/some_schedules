# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          return load_for_object(object, user) if object.respond_to?(:company_id)
          load_for_arguments(arguments, user) if arguments[:slug].present?
        end

        def load_for_object(object, user)
          Batch::RecordLoader.for(::Company, user: user).load(object.company_id)
        end

        def load_for_arguments(arguments, user)
          Batch::RecordLoader.for(::Company, user: user, lookup_column: :slug).load(arguments[:slug])
        end
      end
    end
  end
end
