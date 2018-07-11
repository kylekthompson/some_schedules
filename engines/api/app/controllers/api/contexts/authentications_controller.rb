# frozen_string_literal: true

module API
  module Contexts
    class AuthenticationsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[show]

      def show
        result = API::Authentication::ContextService.build(user: current_user)
        render json: result.serialize, status: result.status
      end
    end
  end
end
