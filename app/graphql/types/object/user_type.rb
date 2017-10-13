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
      field :role, Types::Enum::UserRoleEnum
      field :company, Fields::CompanyField.field
      field :shifts, ShiftType.connection_type
    end
  end
end
