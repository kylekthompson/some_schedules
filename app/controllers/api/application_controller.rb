# frozen_string_literal: true

module API
  class ApplicationController < ActionController::API
    before_action :authenticate_user!

    protected

    def authenticate_user!
      head :unauthorized unless current_user.present?
    end

    def current_user
      return @current_user if @current_user.present?
      result = Token::DecodeService.decode(token: session[:token])

      return nil unless result.success?

      @current_user = User.find_by(email: result.payload.email).tap do |user|
        session[:token] = Token::EncodeService.encode(user: user).token
      end
    end
  end
end
