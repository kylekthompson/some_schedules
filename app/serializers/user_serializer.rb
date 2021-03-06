# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  belongs_to :company

  attributes :email, :first_name, :last_name, :role
end
