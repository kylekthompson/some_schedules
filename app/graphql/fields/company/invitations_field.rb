# frozen_string_literal: true

module Fields
  module Company
    module InvitationsField
      def self.field
        GraphQL::Field.define do
          name 'Invitations'
          description 'The invitations for employees to join a company'
          type types[Types::Object::InvitationType]
          resolve Resolvers::Company::InvitationFinder
        end
      end
    end
  end
end
