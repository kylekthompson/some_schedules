# frozen_string_literal: true

module Types
  module Object
    InvitationType = GraphQL::ObjectType.define do
      name 'Invitation'
      description 'An invitation to join a company as an employee'
      interfaces [
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      field :id, types.String
      field :email, types.String
      field :user, Fields::UserField.field
      field :company, Fields::CompanyField.field
      field :accepted, types.Boolean
    end
  end
end
