# frozen_string_literal: true

module Authentication
  class ContextSerializer < ApplicationSerializer
    attributes :is_admin, :is_signed_in, :role
  end
end
