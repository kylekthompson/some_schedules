# frozen_string_literal: true

module Api
  module V1
    class UserTokenController < Knock::AuthTokenController
      def create
        render json: {
          errors: nil,
          status: 201,
          value: auth_token
        }, status: :created
      end

      private

      def entity_name
        User.to_s
      end
    end
  end
end
