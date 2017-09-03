# frozen_string_literal: true

module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'
    field :createUser, field: Mutations::CreateUserMutation.field
  end
end
