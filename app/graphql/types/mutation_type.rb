# frozen_string_literal: true

module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createInvitation, Mutations::CreateInvitationMutation.field
    field :createShift, Mutations::CreateShiftMutation.field
    field :signIn, Mutations::SignInMutation.field
    field :signUp, Mutations::SignUpMutation.field
  end
end
