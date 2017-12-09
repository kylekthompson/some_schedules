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
          current_user = context[:current_user]
          return load_for_object(object, current_user) if object.respond_to?(:user_id)
          load_for_arguments(arguments, current_user) if arguments[:id].present?
        end

        private

        def load_for_object(object, current_user)
          Batch::RecordLoader.for(::User, user: current_user).load(object.user_id)
        end

        def load_for_arguments(arguments, current_user)
          Batch::RecordLoader.for(::User, user: current_user).load(arguments[:id])
        end
      end
    end
  end
end
