# frozen_string_literal: true

module Resolvers
  module User
    module InvitationFinder
      class << self
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
