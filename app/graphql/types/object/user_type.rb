# frozen_string_literal: true

module Types
  module Object
    UserType = GraphQL::ObjectType.define do
      name 'User'
      description 'The user of the application'
      interfaces [
        GraphQL::Relay::Node.interface,
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      global_id_field :id
      field :email, !types.String
      field :firstName, !types.String, property: :first_name
      field :lastName, !types.String, property: :last_name

      connection :companies, CompanyType.connection_type
      connection :companyUsers, CompanyUserType.connection_type, property: :company_users
    end
  end
end
