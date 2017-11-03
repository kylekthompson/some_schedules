# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        def call(user, _arguments, context)
          raise GraphQL::ExecutionError, 'Authentication required.' unless context[:current_user].present?
          Batch::ForeignKeyLoader.for(::Shift, :user_id).load(user.id)
        end
      end
    end
  end
end
