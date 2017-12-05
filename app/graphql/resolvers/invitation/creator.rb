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

      ##
      # An entry point that simulates a Proc to create an Invitation
      #
      # Requires a user to be logged in
      #
      # [1] pry(main)> context = { current_user: User.first }
      # [2] pry(main)> arguments = { email: 'some@email.com' }
      # [3] pry(main)> Resolvers::Invitation::Creator.call(nil, arguments, context)
      # => { invitation: #<Invitation email: 'some@email.com'> }
      def self.call(_object, arguments, context)
        Resolvers.require_authentication!(context)
        new(arguments.to_h.with_indifferent_access.merge(current_user: context[:current_user])).to_h
      end

      ##
      # Creates a new instance of the Resolvers::Invitation::Creator
      #
      # [1] pry(main)> arguments = { current_user: User.first, email: 'some@email.com' }
      # [2] pry(main)> Resolvers::Invitation::Creator.new(arguments)
      # => #<Resolvers::Invitation::Creator>
      def initialize(arguments)
        @current_user = arguments[:current_user]
        @email = arguments[:email]
      end

      ##
      # Returns the hash representation of the result of creating an invitation (either errors or an invitation)
      #
      # [1] pry(main)> arguments = { current_user: User.first, email: 'some@email.com' }
      # [2] pry(main)> creator = Resolvers::Invitation::Creator.new(arguments)
      # [3] pry(main)> creator.to_h
      # => { invitation: #<Invitation> }
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
        ).can_create?

        invitation.save
      end
    end
  end
end
