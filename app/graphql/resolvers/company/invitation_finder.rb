# frozen_string_literal: true

module Resolvers
  module Company
    module InvitationFinder
      class << self
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
