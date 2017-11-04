# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        def call(user, _arguments, context)
          Resolvers.require_authentication!(context)
          Batch::ForeignKeyLoader.for(::Shift, :user_id).load(user.id)
        end
      end
    end
  end
end
