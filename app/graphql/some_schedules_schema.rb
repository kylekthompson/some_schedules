# frozen_string_literal: true

SomeSchedulesSchema = GraphQL::Schema.define do
  mutation Types::MutationType
  query Types::QueryType
  resolve_type Relay::TypeResolver
  object_from_id Relay::GlobalID::Decode
  id_from_object Relay::GlobalID::Encode
end
