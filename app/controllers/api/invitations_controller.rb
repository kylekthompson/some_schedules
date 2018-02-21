# frozen_string_literal: true

module API
  class InvitationsController < API::ApplicationController
    def invite
      result = Invitations::InviteService.invite(current_user: current_user, email: invite_params[:email])

      render json: {
        error: result.error,
        errors: result.errors,
        invitation: result.invitation
      }, status: result.status
    end

    private

    def invite_params
      params
        .require(:invitation)
        .permit(:email)
        .to_h.deep_symbolize_keys
    end
  end
end
