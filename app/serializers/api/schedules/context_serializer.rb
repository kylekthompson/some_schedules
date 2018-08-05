# frozen_string_literal: true

module API
  module Schedules
    class ContextSerializer < ApplicationSerializer
      has_many :users
      has_many :shifts

      class UserSerializer < ApplicationSerializer
        attributes :first_name, :last_name
      end

      class ShiftSerializer < ApplicationSerializer
        attributes :end_time, :published, :start_time
        has_one :user

        class UserSerializer < ApplicationSerializer; end
      end
    end
  end
end
