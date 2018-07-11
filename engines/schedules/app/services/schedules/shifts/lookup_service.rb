# frozen_string_literal: true

module Schedules
  module Shifts
    class LookupService < Core::Service
      VIEWABLE_BY_ROLE = {
        User::Role::OWNER => ViewableByManager,
        User::Role::MANAGER => ViewableByManager,
        User::Role::EMPLOYEE => ViewableByEmployee,
        nil => ViewableByNilUser,
      }.freeze

      def self.viewable_by(user:)
        VIEWABLE_BY_ROLE.fetch(user&.role).all(user)
      end
    end
  end
end
