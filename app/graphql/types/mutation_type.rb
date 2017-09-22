# frozen_string_literal: true

module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createCompany, Mutations::CreateCompanyMutation.field
    field :createUser, Mutations::CreateUserMutation.field
    field :signIn, Mutations::SignInMutation.field
  end
end
