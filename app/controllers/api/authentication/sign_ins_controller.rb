# frozen_string_literal: true

module API
  module Authentication
    class SignInsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[create]

      def create
        result = API::Authentication::SignInService.sign_in(sign_in_params)

        if result.context.is_signed_in
          session[:token] = result.token
          respond_with(result.context, root: :context, status: :ok)
        else
          respond_with(result.context, root: :context, status: :unauthorized)
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
