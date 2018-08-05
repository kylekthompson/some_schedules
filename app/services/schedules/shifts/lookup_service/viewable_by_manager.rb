# frozen_string_literal: true

module Schedules
  module Shifts
    class LookupService < Core::Service
      module ViewableByManager
        def self.all(manager)
          Shift.for_company(manager.company)
        end
      end
    end
  end
end
