# frozen_string_literal: true

module Types
  module Objects
    UserType = GraphQL::ObjectType.define do
      name 'User'
      description 'Any user of the application'
      interfaces [GraphQL::Relay::Node.interface, Types::Interfaces::TimestampsInterface]
      global_id_field :id
      field :firstName, types.String, property: :first_name
      field :lastName, types.String, property: :last_name
      field :email, types.String, property: :email
    end
  end
end
