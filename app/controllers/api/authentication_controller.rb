# frozen_string_literal: true

module API
  class AuthenticationController < API::ApplicationController
    skip_before_action :authenticate_user, only: %i[context sign_in sign_out]

    def context
      result = Authentication::ContextService.build(user: current_user)

      render json: {
        context: result.context,
        error: result.error
      }, status: result.status
    end
  end
end
