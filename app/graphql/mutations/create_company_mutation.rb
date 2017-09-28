# frozen_string_literal: true

module Mutations
  CreateCompanyMutation = GraphQL::Relay::Mutation.define do
    name 'CreateCompany'
    description 'Create company, assign the current user as owner, and return the company'

    input_field :name, !types.String
    input_field :slug, !types.String

    return_field :company, Types::Object::CompanyType
    resolve Resolvers::Company::Creator
  end
end
