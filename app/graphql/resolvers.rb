# frozen_string_literal: true

module Resolvers
  def self.require_authentication!(context)
    raise GraphQL::ExecutionError, 'Authentication is required.' unless context[:current_user].present?
  end
end
