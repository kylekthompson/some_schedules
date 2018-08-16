# frozen_string_literal: true

module API
  module Contexts
    class SchedulesController < API::ApplicationController
      def show
        context = API::Schedules::ContextService.build(context_params)
        respond_with(context, root: :context)
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
