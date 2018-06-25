# frozen_string_literal: true

module API
  class InvitationsController < API::ApplicationController
    def create
      result = ::Invitations::CreationService.create(current_user: current_user, email: invite_params[:email])

      render json: {
        error: serialized(result.error),
        errors: serialized(result.errors),
        invitation: serialized(result.invitation)
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
