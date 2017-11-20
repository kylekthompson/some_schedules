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
        # [3] pry(main)> Resolvers::Company::ShiftFinder.call(user, nil, context)
        # => [#<Shift>, ...]
        def call(user, _arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          Batch::ForeignKeyLoader.for(::Shift, :user_id, user: user).load(user.id)
        end
      end
    end
  end
end
