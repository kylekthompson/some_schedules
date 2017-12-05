# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        ##
        # Finds the shifts that belong to a user
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> user = User.first
        # [3] pry(main)> Resolvers::User::ShiftFinder.call(user, nil, context)
        # => [#<Shift>, ...]
        def call(user, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          Batch::ForeignKeyLoader.for(
            ::Shift,
            :user_id,
            user: current_user,
            scope_proc: ->(scope) { scope.after(arguments[:after]).before(arguments[:before]) }
          ).load(user.id)
        end
      end
    end
  end
end
