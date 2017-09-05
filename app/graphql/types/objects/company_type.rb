# frozen_string_literal: true

module Types
  module Objects
    CompanyType = GraphQL::ObjectType.define do
      name 'Company'
      description 'The company that owns the schedule'
      interfaces [GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface]

      global_id_field :id
      field :name, types.String
      field :slug, types.String

      connection :companyUsers, CompanyUserType.connection_type, property: :company_users
      connection :users, UserType.connection_type
    end
  end
end
