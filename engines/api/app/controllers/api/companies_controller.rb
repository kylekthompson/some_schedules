# frozen_string_literal: true

module API
  class CompaniesController < API::ApplicationController
    def create
      result = API::Companies::CreationService.create(creation_params)
      render json: result.serialize, status: result.status
    end

    private

    def creation_params
      params
        .require(:company)
        .permit(:name, :slug)
        .merge(current_user: current_user)
        .to_h.symbolize_keys
    end
  end
end
