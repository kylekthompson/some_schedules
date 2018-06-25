# frozen_string_literal: true

module API
  module Contexts
    class SchedulesController < API::ApplicationController
      def show
        result = ::Schedules::ContextService.build(
          user: current_user,
          after: params[:after],
          before: params[:before]
        )

        render json: {
          context: serialized(result.context),
          error: serialized(result.error)
        }, status: result.status
      end
    end
  end
end
