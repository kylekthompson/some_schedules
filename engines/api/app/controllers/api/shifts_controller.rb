# frozen_string_literal: true

module API
  class ShiftsController < API::ApplicationController
    def create
      result = ::Shifts::CreationService.create(current_user: current_user, params: shift_creation_params)

      render json: {
        error: serialized(result.error),
        errors: serialized(result.errors),
        shift: serialized(result.shift)
      }, status: result.status
    end

    private

    def shift_creation_params
      params
        .require(:shift)
        .permit(:end_time, :start_time)
        .merge(user_id: params[:user_id])
        .to_h.deep_symbolize_keys
    end
  end
end
