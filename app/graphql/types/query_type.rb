# frozen_string_literal: true

module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'

    field :company, Fields::CompanyField.field
    field :companies, Fields::CompanyField.plural_field
    field :user, Fields::UserField.field
    field :viewer, Fields::ViewerField.field
  end
end
