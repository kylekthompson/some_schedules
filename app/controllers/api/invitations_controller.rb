# frozen_string_literal: true

module API
  class InvitationsController < API::ApplicationController
    def create
      invitation = ::Accounts::Invitations::CreationService.create(creation_params)
      respond_with(invitation)
    end

    private

    def creation_params
      params
        .require(:invitation)
        .permit(:email)
        .merge(invited_by: current_user)
        .to_h.symbolize_keys
    end
  end
end
