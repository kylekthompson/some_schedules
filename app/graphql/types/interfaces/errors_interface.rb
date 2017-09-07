# frozen_string_literal: true

module Types
  module Interfaces
    ErrorsInterface = GraphQL::InterfaceType.define do
      name 'Errors'
      description 'Errors field'

      field :errors, Types::Scalar::JsonBlobType
    end
  end
end
