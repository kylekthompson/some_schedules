# frozen_string_literal: true

module API
  module Authentication
    class SignInsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[create]

      def create
        result = ::Authentication::SignInService.sign_in(sign_in_params)

        session[:token] = result.token if result.success?

        render json: {
          context: serialized(result.authentication_context),
          error: serialized(result.error)
        }, status: result.status
      end

      private

      def sign_in_params
        params
          .require(:authentication)
          .permit(:email, :password)
          .to_h.deep_symbolize_keys
      end
    end
  end
end
