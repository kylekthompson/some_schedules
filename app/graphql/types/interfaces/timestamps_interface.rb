# frozen_string_literal: true

module Types
  module Interfaces
    TimestampsInterface = GraphQL::InterfaceType.define do
      name 'Timestamps'
      description 'Created at and updated at timestamps'

      field :createdAt, !types.String, property: :created_at
      field :updatedAt, !types.String, property: :updated_at
    end
  end
end
