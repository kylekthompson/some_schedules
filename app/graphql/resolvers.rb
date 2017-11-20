# frozen_string_literal: true

module Resolvers
  ##
  # Raises a GraphQL::ExecutionError if there is no user logged in
  #
  # [1] pry(main)> Resolvers.require_authentication!(current_user: nil )
  # => GraphQL::ExecutionError: Authentication is required.
  # [2] pry(main)> Resolvers.require_authentication!(current_user: User.new)
  # => nil
  def self.require_authentication!(context)
    raise GraphQL::ExecutionError, 'Authentication is required.' unless context[:current_user].present?
  end
end
