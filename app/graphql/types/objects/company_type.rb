# frozen_string_literal: true

module Types
  module Objects
    CompanyType = GraphQL::ObjectType.define do
      name 'Company'
      description 'The company that owns the schedule'
      interfaces [GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface]
      global_id_field :id
      field :name, types.String, property: :name
      field :slug, types.String, property: :slug
      connection :companyUsers, CompanyUserType.connection_type, property: :company_users
      connection :users, UserType.connection_type, property: :users
    end
  end
end
