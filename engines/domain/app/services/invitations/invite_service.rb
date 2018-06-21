# frozen_string_literal: true

module Invitations
  class InviteService
    attr_accessor :current_user, :email

    def self.invite(current_user:, email:)
      new(current_user: current_user, email: email).result
    end

    def initialize(current_user:, email:)
      @current_user = current_user
      @email = email
    end

    def result
      invitation = Invitation.new(email: email, user: current_user)

      return unauthorized unless can_invite?(invitation)
      return invited(invitation) if invitation.save

      errors(invitation)
    end

    private

    def can_invite?(invitation)
      Policy.for(current_user: current_user, subject: invitation).can_invite?
    end

    def unauthorized
      OpenStruct.new(
        error: I18n.t!('services.invitations.invite.unauthorized', email: email),
        status: :forbidden,
        success?: false
      )
    end

    def invited(invitation)
      OpenStruct.new(
        invitation: invitation,
        status: :created,
        success?: true
      )
    end

    def errors(invitation)
      OpenStruct.new(
        errors: invitation.errors.messages,
        status: :unprocessable_entity,
        success?: false
      )
    end
  end
end
