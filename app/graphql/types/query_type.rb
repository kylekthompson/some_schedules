# frozen_string_literal: true

module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'

    field :company, Fields::CompanyField.field
    field :user, Fields::UserField.field

    field :node, GraphQL::Relay::Node.field
    field :nodes, GraphQL::Relay::Node.plural_field
  end
end
