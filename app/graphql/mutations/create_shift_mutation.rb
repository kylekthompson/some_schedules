# frozen_string_literal: true

module Mutations
  CreateShiftMutation = GraphQL::Relay::Mutation.define do
    name 'CreateShift'
    description 'Create a shift for a user'

    input_field :endTime, !Types::Scalar::DateType, as: :end_time
    input_field :startTime, !Types::Scalar::DateType, as: :start_time
    input_field :userId, !types.Int, as: :user_id

    return_field :errors, Types::Scalar::JsonBlobType
    return_field :shift, Types::Object::ShiftType

    resolve Resolvers::Shift::Creator
  end
end
