# frozen_string_literal: true

module Fields
  module Company
    module UsersField
      def self.field
        GraphQL::Field.define do
          name 'Users'
          description 'The users that are part of a company'
          type types[Types::Object::UserType]
          resolve Resolvers::Company::UserFinder
        end
      end
    end
  end
end
