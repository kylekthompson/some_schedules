# frozen_string_literal: true

module Types
  module Interface
    ErrorsInterface = GraphQL::InterfaceType.define do
      name 'Errors'
      description 'Errors field'

      field :errors, Types::Scalar::JsonBlobType
    end
  end
end
