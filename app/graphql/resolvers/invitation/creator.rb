# frozen_string_literal: true

module Resolvers
  module Invitation
    class Creator
      INVITATION_AUTHORIZATION_ERROR_MESSAGE = 'Not authorized to create an invitation with those parameters'

      include ActiveModel::Validations

      validates :current_user, presence: true
      validates :email, presence: true
      validates :email, format: Helpers::EmailFormatter::FORMAT

      attr_accessor :current_user, :email, :invitation

      def self.call(_object, arguments, context)
        Resolvers.require_authentication!(context)
        new(arguments.to_h.with_indifferent_access.merge(current_user: context[:current_user])).to_h
      end

      def initialize(arguments)
        @current_user = arguments[:current_user]
        @email = arguments[:email]
      end

      def to_h
        return { errors: errors.messages } unless valid?
        create_invitation
        return { errors: invitation.errors.messages } unless invitation.valid?
        { invitation: invitation }
      end

      private

      def create_invitation
        @invitation = current_user.invitations.build(email: email)

        raise GraphQL::ExecutionError, INVITATION_AUTHORIZATION_ERROR_MESSAGE unless Policy.for(
          current_user: current_user,
          subject: invitation
        ).can_invite?

        invitation.save
      end
    end
  end
end
