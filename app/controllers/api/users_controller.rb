# frozen_string_literal: true

module API
  class UsersController < API::ApplicationController
    skip_before_action :authenticate_user!, only: %i[create]
    before_action :ensure_not_authenticated!, only: %i[create]

    def create
      user = ::Accounts::Users::CreationService.create(creation_params)

      session[:token] = ::Authentication::Tokens::EncodeService.encode(user: user)
      respond_with(user)
    end

    private

    def ensure_not_authenticated!
      raise API::Errors::NotAuthorizedError if current_user.present?
    end

    def creation_params
      params
        .require(:user)
        .permit(:email, :first_name, :last_name, :password, :password_confirmation)
        .merge(role: User::Role::OWNER)
        .to_h.symbolize_keys
    end
  end
end
