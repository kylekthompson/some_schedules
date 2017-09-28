# frozen_string_literal: true

module Fields
  module UserField
    def self.field
      GraphQL::Field.define do
        name 'user'
        description 'The user of the application'
        type Types::Object::UserType
        argument :id, types.ID, 'The id of the user'
        resolve Resolvers::User::Finder
      end
    end
  end
end
