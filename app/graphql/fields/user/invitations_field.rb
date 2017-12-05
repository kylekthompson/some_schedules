# frozen_string_literal: true

module Fields
  module User
    module InvitationsField
      def self.field
        GraphQL::Field.define do
          name 'Invitations'
          description 'The invitations created by a user to invite an employee to join the company'
          type types[Types::Object::InvitationType]
          resolve Resolvers::User::InvitationFinder
        end
      end
    end
  end
end
