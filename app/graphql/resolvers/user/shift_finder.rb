# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        def call(user, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          Batch::ForeignKeyLoader.for(
            ::Shift,
            :user_id,
            user: current_user,
            scope_proc: ->(scope) { scope.after(arguments[:after]).before(arguments[:before]) }
          ).load(user.id)
        end
      end
    end
  end
end
