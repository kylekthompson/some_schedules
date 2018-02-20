# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          return load_for_object(object, current_user) if object.respond_to?(:company_id)
          load_for_arguments(arguments, current_user) if arguments[:slug].present?
        end

        private

        def load_for_object(object, current_user)
          Batch::RecordLoader.for(::Company, user: current_user).load(object.company_id)
        end

        def load_for_arguments(arguments, current_user)
          Batch::RecordLoader.for(::Company, user: current_user, lookup_column: :slug).load(arguments[:slug])
        end
      end
    end
  end
end
