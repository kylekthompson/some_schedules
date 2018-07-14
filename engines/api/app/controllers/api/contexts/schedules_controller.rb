# frozen_string_literal: true

module API
  module Contexts
    class SchedulesController < API::ApplicationController
      def show
        result = API::Schedules::ContextService.build(context_params)
        render json: result.serialize, status: result.status
      end

      private

      def context_params
        {
          user: current_user,
          after: params.require(:after),
          before: params.require(:before),
        }
      end
    end
  end
end
