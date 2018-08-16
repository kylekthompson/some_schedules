# frozen_string_literal: true

module API
  class ApplicationController < ActionController::API
    before_action :authenticate_user!

    rescue_from API::Errors::NotAuthorizedError, with: :forbidden
    respond_to :json

    private

    def authenticate_user!
      head :unauthorized unless current_user.present?
    end

    def current_user
      return @current_user if @current_user.present?

      result = API::CurrentUserService.find(token: session[:token])

      session[:token] = result.token
      @current_user = result.user
    end

    def forbidden
      head :forbidden
    end

    def respond_with(resource, **options)
      super(resource, options.merge(location: nil))
    end
  end
end
