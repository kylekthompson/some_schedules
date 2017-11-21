# frozen_string_literal: true

module Types
  module Interface
    TimestampsInterface = GraphQL::InterfaceType.define do
      name 'Timestamps'
      description 'Created at and updated at timestamps'

      field :createdAt, !Types::Scalar::DateType, property: :created_at
      field :updatedAt, !Types::Scalar::DateType, property: :updated_at
    end
  end
end
