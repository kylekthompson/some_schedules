# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        def call(user, _arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          Batch::ForeignKeyLoader.for(::Shift, :user_id, user: user).load(user.id)
        end
      end
    end
  end
end
