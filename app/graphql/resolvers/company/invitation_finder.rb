# frozen_string_literal: true

module Resolvers
  module Company
    module InvitationFinder
      class << self
        ##
        # Finds the invitations that belong to users within a company
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> company = Company.first
        # [3] pry(main)> Resolvers::Company::InvitationFinder.call(company, nil, context)
        # => [#<Invitation>, ...]
        def call(company, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          UserFinder.call(company, arguments, context).then do |users|
            Batch::ForeignKeyLoader.for(
              ::Invitation,
              :user_id,
              user: current_user
            ).load(users.pluck(:id))
          end
        end
      end
    end
  end
end
