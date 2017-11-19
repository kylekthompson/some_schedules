# frozen_string_literal: true

module Resolvers
  module Company
    module UserFinder
      class << self
        def call(company, _arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          Batch::ForeignKeyLoader.for(::User, :company_id, user: user).load(company.id)
        end
      end
    end
  end
end
