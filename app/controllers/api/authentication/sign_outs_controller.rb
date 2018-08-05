# frozen_string_literal: true

module API
  module Authentication
    class SignOutsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[create]

      def create
        session[:token] = nil
        head :no_content
      end
    end
  end
end
