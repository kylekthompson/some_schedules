# frozen_string_literal: true

module Types
  module Objects
    CompanyUserType = GraphQL::ObjectType.define do
      name 'CompanyUser'
      description 'The companyUser that defines a relationship between a company and user'
      interfaces [GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface]
      global_id_field :id
      field :role, types.Int, property: :role
      field :companyId, types.ID, property: :company_id
      field :userId, types.ID, property: :user_id
      field :company, Fields::CompanyField.field, property: :company
      field :user, Fields::UserField.field, property: :user
    end
  end
end
