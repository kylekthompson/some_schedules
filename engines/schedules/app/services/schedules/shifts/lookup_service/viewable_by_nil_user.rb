# frozen_string_literal: true

module Schedules
  module Shifts
    class LookupService < Core::Service
      module ViewableByNilUser
        def self.all(_nil_user)
          Shift.none
        end
      end
    end
  end
end
