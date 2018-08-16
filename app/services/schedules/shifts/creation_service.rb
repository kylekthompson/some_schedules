# frozen_string_literal: true

module Schedules
  module Shifts
    class CreationService < Core::Service
      def self.create(current_user:, user:, **params)
        raise API::Errors::NotAuthorizedError unless current_user.managerial? && current_user.company == user.company

        Shift.create(params.merge(user: user))
      end
    end
  end
end
