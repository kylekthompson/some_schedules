# frozen_string_literal: true

module API
  class AuthenticationController < API::ApplicationController
    skip_before_action :authenticate_user!, only: %i[context sign_in sign_out sign_up]

    def context
      result = Authentication::ContextService.build(user: current_user)

      render json: {
        context: result.context,
        error: result.error
      }, status: result.status
    end

    def sign_in
      result = Authentication::SignInService.sign_in(sign_in_params)

      if result.success?
        session[:token] = result.token
        render json: { context: result.authentication_context }, status: result.status
      else
        render json: { error: result.error }, status: result.status
      end
    end

    def sign_out
      session[:token] = nil
      head :no_content
    end

    def sign_up
      result = Authentication::SignUpService.sign_up(sign_up_params)

      if result.success?
        session[:token] = result.token
        render json: { context: result.authentication_context }, status: result.status
      else
        render json: { error: result.error, errors: result.errors }, status: result.status
      end
    end

    private

    def sign_in_params
      params
        .require(:authentication)
        .permit(:email, :password)
        .to_h.deep_symbolize_keys
    end

    def sign_up_params
      {
        company: company_sign_up_params,
        current_user: current_user,
        user: user_sign_up_params
      }
    end

    def company_sign_up_params
      params
        .require(:authentication)
        .require(:company)
        .permit(:name, :slug)
        .to_h.deep_symbolize_keys
    end

    def user_sign_up_params
      params
        .require(:authentication)
        .require(:user)
        .permit(:email, :first_name, :last_name, :password, :password_confirmation)
        .to_h.deep_symbolize_keys
    end
  end
end
