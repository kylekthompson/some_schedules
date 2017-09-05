# frozen_string_literal: true

module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'
    field :createUser, Mutations::CreateUserMutation.field
  end
end
