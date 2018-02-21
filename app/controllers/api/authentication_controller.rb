# frozen_string_literal: true

module API
  class AuthenticationController < API::ApplicationController
    skip_before_action :authenticate_user!, only: %i[context sign_in sign_out]

    def context
      result = Authentication::ContextService.build(user: current_user)

      render json: {
        context: result.context,
        error: result.error
      }, status: result.status
    end

    def sign_in
      result = Authentication::SignInService.sign_in(
        email: sign_in_params[:email],
        password: sign_in_params[:password]
      )

      if result.success?
        session[:token] = result.token
        render json: { context: result.authentication_context }, status: result.status
      else
        render json: { error: result.error }, status: result.status
      end
    end

    private

    def sign_in_params
      params.require(:authentication).permit(:email, :password)
    end
  end
end
