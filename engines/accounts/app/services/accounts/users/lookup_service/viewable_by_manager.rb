# frozen_string_literal: true

module Accounts
  module Users
    class LookupService < Core::Service
      module ViewableByManager
        def self.all(manager)
          User.where(company_id: manager.company_id)
        end
      end
    end
  end
end
