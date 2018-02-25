# frozen_string_literal: true

module API
  class SchedulesController < API::ApplicationController
    def context
      result = Schedules::ContextService.build(user: current_user, params: schedule_context_params)

      render json: {
        context: serialized(result.context),
        error: serialized(result.error)
      }, status: result.status
    end

    private

    def schedule_context_params
      {
        after: params[:after],
        before: params[:before]
      }
    end
  end
end
