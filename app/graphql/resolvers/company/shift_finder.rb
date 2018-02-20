# frozen_string_literal: true

module Resolvers
  module Company
    module ShiftFinder
      class << self
        def call(company, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          UserFinder.call(company, arguments, context).then do |users|
            Batch::ForeignKeyLoader.for(
              ::Shift,
              :user_id,
              user: current_user,
              scope_proc: ->(scope) { scope.after(arguments[:after]).before(arguments[:before]) }
            ).load(users.pluck(:id))
          end
        end
      end
    end
  end
end
