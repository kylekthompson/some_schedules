# frozen_string_literal: true

module Resolvers
  module Company
    module UserFinder
      class << self
        ##
        # Finds the users that belong to a company
        #
        # Requires a user to be logged in
        #
        # Note: to execute this outside of the Schema, wrap the call like this: `GraphQL::Batch.batch { ... }`
        #
        # [1] pry(main)> context = { current_user: User.first }
        # [2] pry(main)> company = Company.first
        # [3] pry(main)> Resolvers::Company::UserFinder.call(company, nil, context)
        # => [#<User>, ...]
        def call(company, _arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          Batch::ForeignKeyLoader.for(::User, :company_id, user: user).load(company.id)
        end
      end
    end
  end
end
