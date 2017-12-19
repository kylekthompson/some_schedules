# frozen_string_literal: true

module Mutations
  CreateInvitationMutation = GraphQL::Relay::Mutation.define do
    name 'CreateInvitation'
    description 'Create an invitation to invite an employee to a company'

    input_field :email, !types.String

    return_field :errors, Types::Scalar::JsonBlobType
    return_field :invitation, Types::Object::InvitationType

    resolve Resolvers::Invitation::Creator
  end
end
