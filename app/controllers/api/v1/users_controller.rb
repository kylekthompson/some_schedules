# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::ApplicationController
      skip_before_action :authenticate_user, only: :create

      def create
        @api_response = Users::Creator.new(params: params).create
        render :create, status: @api_response.status
      end
    end
  end
end
