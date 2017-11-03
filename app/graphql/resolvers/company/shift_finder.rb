# frozen_string_literal: true

module Resolvers
  module Company
    module ShiftFinder
      class << self
        def call(company, _arguments, context)
          raise GraphQL::ExecutionError, 'Authentication required.' unless context[:current_user].present?
          Batch::ForeignKeyLoader.for(::User, :company_id).load(company.id).then do |users|
            Batch::ForeignKeyLoader.for(::Shift, :user_id).load(users.pluck(:id))
          end
        end
      end
    end
  end
end
