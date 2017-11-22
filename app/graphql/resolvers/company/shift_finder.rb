# frozen_string_literal: true

module Resolvers
  module Company
    module ShiftFinder
      class << self
        ##
        # Finds the shifts that belong to users within a company
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> company = Company.first
        # [3] pry(main)> Resolvers::Company::ShiftFinder.call(company, nil, context)
        # => [#<Shift>, ...]
        def call(company, arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          UserFinder.call(company, arguments, context).then do |users|
            Batch::ForeignKeyLoader.for(
              ::Shift,
              :user_id,
              user: user,
              scope_proc: ->(scope) { scope.after(arguments[:after]).before(arguments[:before]) }
            ).load(users.pluck(:id))
          end
        end
      end
    end
  end
end
