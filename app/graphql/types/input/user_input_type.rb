# frozen_string_literal: true

module Types
  module Input
    UserInputType = GraphQL::InputObjectType.define do
      name "UserInputType"

      input_field :firstName, !types.String, as: :first_name
      input_field :lastName, !types.String, as: :last_name
      input_field :email, !types.String
      input_field :password, !types.String
      input_field :passwordConfirmation, !types.String, as: :password_confirmation
    end
  end
end
