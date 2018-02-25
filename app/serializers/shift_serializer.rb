# frozen_string_literal: true

class ShiftSerializer < ApplicationSerializer
  attributes :end_time, :start_time
  belongs_to :user

  class UserSerializer < ApplicationSerializer; end
end
