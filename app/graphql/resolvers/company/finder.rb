# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        ##
        # Finds the company that matches either the object or arguments passed in
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> Resolvers::Company::Finder.call(nil, { slug: 'slug' }, context)
        # => #<Company slug: "slug">
        # [3] pry(main)> Resolvers::Company::Finder.call(User.first, nil, context)
        # => #<Company>
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          return load_for_object(object, user) if object.respond_to?(:company_id)
          load_for_arguments(arguments, user) if arguments[:slug].present?
        end

        private

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
