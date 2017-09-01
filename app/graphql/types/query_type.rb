# frozen_string_literal: true

module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    field :company, Fields::CompanyField.field
    field :companies, Fields::CompanyField.plural_field
    field :companyUser, Fields::CompanyUserField.field
    field :companyUsers, Fields::CompanyUserField.plural_field
    field :user, Fields::UserField.field
    field :users, Fields::UserField.plural_field
    field :node, GraphQL::Relay::Node.field
    field :nodes, GraphQL::Relay::Node.plural_field
  end
end
