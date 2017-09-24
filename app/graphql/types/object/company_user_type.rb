# frozen_string_literal: true

module Types
  module Object
    CompanyUserType = GraphQL::ObjectType.define do
      name 'CompanyUser'
      description 'The companyUser that defines a relationship between a company and user'
      interfaces [
        GraphQL::Relay::Node.interface,
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      global_id_field :id
      field :role, !types.Int
      field :company, Fields::CompanyField.field
      field :user, Fields::UserField.field
    end
  end
end
