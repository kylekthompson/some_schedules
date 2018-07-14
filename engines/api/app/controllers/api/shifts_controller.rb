# frozen_string_literal: true

module API
  class ShiftsController < API::ApplicationController
    def create
      result = API::Shifts::CreationService.create(creation_params)
      render json: result.serialize, status: result.status
    end

    private

    def user
      @user ||= User.find(params[:user_id])
    end

    def creation_params
      params
        .require(:shift)
        .permit(:end_time, :start_time)
        .merge(user: user, current_user: current_user)
        .to_h.symbolize_keys
    end
  end
end
