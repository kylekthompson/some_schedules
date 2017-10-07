# frozen_string_literal: true

module Mutations
  SignUpMutation = GraphQL::Relay::Mutation.define do
    name 'SignUp'
    description 'Create a company and the owner of the company'

    input_field :company, !Types::Input::CompanyInputType
    input_field :user, !Types::Input::UserInputType

    return_field :company, Types::Object::CompanyType
    return_field :companyErrors, Types::Scalar::JsonBlobType, property: :company_errors
    return_field :errors, Types::Scalar::JsonBlobType
    return_field :user, Types::Object::UserType
    return_field :userErrors, Types::Scalar::JsonBlobType, property: :user_errors
    return_field :token, GraphQL::STRING_TYPE

    resolve Resolvers::SignUp
  end
end
