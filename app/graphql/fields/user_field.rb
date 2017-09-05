# frozen_string_literal: true

module Fields
  module UserField
    def self.field
      GraphQL::Field.define do
        name 'user'
        description 'The user of the application'
        type Types::Objects::UserType
        argument :id, types.ID, 'The id of the user'
        resolve Resolvers::User::Finder
      end
    end

    def self.plural_field
      GraphQL::Field.define do
        name 'users'
        description 'A list of users'
        type !types[Types::Objects::UserType]
        argument :ids, !types[!types.ID], 'The ids of the users'
        resolve Resolvers::User::Finder
      end
    end
  end
end
