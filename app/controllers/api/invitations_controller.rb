# frozen_string_literal: true

module API
  class InvitationsController < API::ApplicationController
    def create
      result = API::Invitations::CreationService.create(invite_params)
      render json: result.serialize, status: result.status
    end

    private

    def invite_params
      params
        .require(:invitation)
        .permit(:email)
        .merge(current_user: current_user)
        .to_h.symbolize_keys
    end
  end
end
