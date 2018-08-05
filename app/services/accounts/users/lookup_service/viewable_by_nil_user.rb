# frozen_string_literal: true

module Accounts
  module Users
    class LookupService < Core::Service
      module ViewableByNilUser
        def self.all(_nil_user)
          User.none
        end
      end
    end
  end
end
