# frozen_string_literal: true

module Mutations
  CreateUserMutation = GraphQL::Relay::Mutation.define do
    name 'CreateUser'
    description 'Create user and return the user'

    input_field :firstName, !types.String, as: :first_name
    input_field :lastName, !types.String, as: :last_name
    input_field :email, !types.String
    input_field :password, !types.String
    input_field :passwordConfirmation, !types.String, as: :password_confirmation

    return_field :user, Types::Objects::UserType
    resolve Resolvers::User::Creator
  end
end
