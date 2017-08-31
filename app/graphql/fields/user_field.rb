# frozen_string_literal: true

module Fields
  UserField = GraphQL::Field.define do
    name 'user'
    description 'The user of the application'
    type Types::Objects::UserType
    argument :id, !types.Int, 'The id of the user'
    resolve Resolvers::User::Finder
  end
end
