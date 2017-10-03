# frozen_string_literal: true

module Mutations
  SignInMutation = GraphQL::Relay::Mutation.define do
    name 'SignIn'
    description 'Sign in as a user'

    input_field :email, !types.String
    input_field :password, !types.String

    return_field :errors, Types::Scalar::JsonBlobType
    return_field :token, types.String
    resolve Resolvers::User::Token
  end
end
