# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        ##
        # Finds the user that matches either the object or arguments passed in
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> Resolvers::User::Finder.call(nil, { id: 1 }, context)
        # => #<User id: 1>
        # [3] pry(main)> Resolvers::User::Finder.call(Shift.first, nil, context)
        # => #<User>
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          return load_for_object(object, user) if object.respond_to?(:user_id)
          load_for_arguments(arguments, user) if arguments[:id].present?
        end

        private

        def load_for_object(object, user)
          Batch::RecordLoader.for(::User, user: user).load(object.user_id)
        end

        def load_for_arguments(arguments, user)
          Batch::RecordLoader.for(::User, user: user).load(arguments[:id])
        end
      end
    end
  end
end
