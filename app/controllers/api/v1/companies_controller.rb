# frozen_string_literal: true

module Api
  module V1
    class CompaniesController < Api::ApplicationController
      def create
        @api_response = Companies::Creator.new(user: current_user, params: params).create
        render :create, status: @api_response.status
      end
    end
  end
end
