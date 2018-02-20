# frozen_string_literal: true

module API
  class GraphqlController < API::ApplicationController
    skip_before_action :authenticate_user

    def execute
      context = { current_user: current_user }
      result = SomeSchedulesSchema.execute(
        params[:query],
        variables: Helpers::HashCoercer.new(ambiguous_param: params[:variables]).to_h,
        context: context,
        operation_name: params[:operationName]
      )
      render json: result
    end
  end
end
