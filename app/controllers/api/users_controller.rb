# frozen_string_literal: true

module API
  class UsersController < API::ApplicationController
    skip_before_action :authenticate_user!, only: %i[create]

    def create
      result = API::Users::CreationService.create(creation_params)

      session[:token] = result.token
      render json: result.serialize, status: result.status
    end

    private

    def creation_params
      params
        .require(:user)
        .permit(:email, :first_name, :last_name, :password, :password_confirmation)
        .merge(current_user: current_user)
        .to_h.symbolize_keys
    end
  end
end
