# frozen_string_literal: true

module Fields
  module ViewerField
    def self.field
      GraphQL::Field.define do
        name 'viewer'
        description 'The current user of the application'
        type Types::Object::UserType
        resolve Resolvers::User::Viewer
      end
    end
  end
end
