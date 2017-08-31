# frozen_string_literal: true

module Api
  module V1
    class GraphqlController < Api::ApplicationController
      skip_before_action :authenticate_user

      def execute
        context = { current_user: current_user }
        result = SomeSchedulesSchema.execute(
          params[:query],
          variables: ensure_hash(params[:variables]),
          context: context,
          operation_name: params[:operationName]
        )
        render json: result
      end

      private

      # Handle form data, JSON body, or a blank value
      def ensure_hash(ambiguous_param)
        case ambiguous_param
        when String
          if ambiguous_param.present?
            ensure_hash(JSON.parse(ambiguous_param))
          else
            {}
          end
        when Hash, ActionController::Parameters
          ambiguous_param
        when nil
          {}
        else
          raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
        end
      end
    end
  end
end
