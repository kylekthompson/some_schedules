# frozen_string_literal: true

module API
  class CompaniesController < API::ApplicationController
    def create
      company = ::Accounts::Companies::CreationService.create(creation_params)
      respond_with(company)
    end

    private

    def creation_params
      params
        .require(:company)
        .permit(:name, :slug)
        .merge(user: current_user)
        .to_h.symbolize_keys
    end
  end
end
