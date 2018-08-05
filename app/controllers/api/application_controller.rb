# frozen_string_literal: true

module API
  class ApplicationController < ActionController::API
    before_action :authenticate_user!

    rescue_from API::Errors::NotAuthorizedError, with: :forbidden

    protected

    def authenticate_user!
      head :unauthorized unless current_user.present?
    end

    def current_user
      return @current_user if @current_user.present?
      result = ::Authentication::Tokens::DecodeService.decode(token: session[:token])

      return nil unless result.success?

      @current_user = User.find_by(email: result.email).tap do |user|
        session[:token] = ::Authentication::Tokens::EncodeService.encode(user: user).token
      end
    end

    def forbidden
      head :forbidden
    end
  end
end
