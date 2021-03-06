# frozen_string_literal: true

module API
  module Authentication
    class SignInsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[create]

      def create
        result = API::Authentication::SignInService.sign_in(sign_in_params)

        if result.user
          session[:token] = result.token
          respond_with(result.user, root: :me, status: :ok)
        else
          render json: { me: nil }, status: :unauthorized
        end
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
