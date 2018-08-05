# frozen_string_literal: true

module Accounts
  module Users
    class LookupService < Core::Service
      module ViewableByEmployee
        def self.all(employee)
          User.where(id: employee.id)
        end
      end
    end
  end
end
