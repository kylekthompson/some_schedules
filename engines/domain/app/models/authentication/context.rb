# frozen_string_literal: true

module Authentication
  class Context
    include ActiveModel::Serialization

    attr_reader :is_admin, :is_signed_in, :role

    def initialize(user:)
      @is_signed_in = user.present?
      @is_admin = is_signed_in && user.admin?
      @role = user&.role
    end
  end
end
