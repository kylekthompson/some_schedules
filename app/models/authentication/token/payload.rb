# frozen_string_literal: true

module Authentication
  module Token
    class Payload
      pattr_initialize :payload

      def email
        payload[:email]
      end
    end
  end
end
