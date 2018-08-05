# frozen_string_literal: true

module Schedules
  module Shifts
    class LookupService < Core::Service
      module ViewableByEmployee
        def self.all(employee)
          Shift.for_company(employee.company).published.where(user: employee)
        end
      end
    end
  end
end
