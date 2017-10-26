# frozen_string_literal: true

module Types
  module Object
    UserType = GraphQL::ObjectType.define do
      name 'User'
      description 'The user of the application'
      interfaces [
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      field :id, !types.Int
      field :email, !types.String
      field :firstName, !types.String, property: :first_name
      field :lastName, !types.String, property: :last_name
      field :role, Types::Enum::UserRoleEnum
      field :company, Fields::CompanyField.field
      field :shifts, types[ShiftType]
    end
  end
end
