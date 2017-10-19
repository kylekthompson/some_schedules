# frozen_string_literal: true

module Types
  module Object
    ShiftType = GraphQL::ObjectType.define do
      name 'Shift'
      description 'The shift that belongs to a user'
      interfaces [
        GraphQL::Relay::Node.interface,
        Types::Interface::TimestampsInterface,
        Types::Interface::ErrorsInterface
      ].freeze

      global_id_field :id
      field :endTime, !types.String, property: :end_time
      field :published, !types.Boolean
      field :startTime, !types.String, property: :start_time
      field :user, Fields::UserField.field
    end
  end
end
