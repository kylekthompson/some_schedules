# frozen_string_literal: true

module API
  module Authentication
    class Context
      include ActiveModel::Serialization

      attr_reader :is_signed_in, :role

      def initialize(user:)
        @is_signed_in = user.present?
        @role = user&.role
      end
    end
  end
end
