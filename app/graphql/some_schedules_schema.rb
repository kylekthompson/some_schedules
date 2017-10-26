# frozen_string_literal: true

SomeSchedulesSchema = GraphQL::Schema.define do
  mutation Types::MutationType
  query Types::QueryType
  resolve_type Resolvers::Type
end
