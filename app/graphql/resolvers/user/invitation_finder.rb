# frozen_string_literal: true

module Resolvers
  module User
    module InvitationFinder
      class << self
        ##
        # Finds the invitations that were created by a user
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> user = User.first
        # [3] pry(main)> Resolvers::User::InvitationFinder.call(user, nil, context)
        # => [#<Invitation>, ...]
        def call(user, _arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          Batch::ForeignKeyLoader.for(
            ::Invitation,
            :user_id,
            user: current_user
          ).load(user.id)
        end
      end
    end
  end
end
