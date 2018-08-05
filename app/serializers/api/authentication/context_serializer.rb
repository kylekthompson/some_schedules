# frozen_string_literal: true

module API
  module Authentication
    class ContextSerializer < ApplicationSerializer
      attributes :is_signed_in, :role
    end
  end
end
