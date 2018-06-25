# frozen_string_literal: true

module API
  module Contexts
    class AuthenticationsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[show]

      def show
        result = ::Authentication::ContextService.build(user: current_user)

        render json: {
          context: serialized(result.context),
          error: serialized(result.error)
        }, status: result.status
      end
    end
  end
end
