# frozen_string_literal: true

module API
  module Contexts
    class AuthenticationsController < API::ApplicationController
      skip_before_action :authenticate_user!, only: %i[show]

      def show
        respond_with(Authentication::Context.new(user: current_user), root: :context)
      end
    end
  end
end
