# frozen_string_literal: true

module Types
  module Object
    ShiftType = GraphQL::ObjectType.define do
      name 'Shift'
      description 'The shift that belongs to a user'
      interfaces [
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      field :id, !types.Int
      field :endTime, !types.String, property: :end_time
      field :published, !types.Boolean
      field :startTime, !types.String, property: :start_time
      field :user, Fields::UserField.field
    end
  end
end
