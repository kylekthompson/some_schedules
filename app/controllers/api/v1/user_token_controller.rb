# frozen_string_literal: true

module Api
  module V1
    class UserTokenController < Knock::AuthTokenController
      private

      def entity_name
        User.to_s
      end
    end
  end
end
