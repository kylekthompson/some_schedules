# frozen_string_literal: true

module Types
  module Object
    CompanyType = GraphQL::ObjectType.define do
      name 'Company'
      description 'The company that owns the schedule'
      interfaces [
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      field :id, types.Int
      field :name, types.String
      field :slug, types.String
      field :invitations, Fields::Company::InvitationsField.field
      field :users, Fields::Company::UsersField.field
      field :shifts, Fields::Company::ShiftsField.field
    end
  end
end
