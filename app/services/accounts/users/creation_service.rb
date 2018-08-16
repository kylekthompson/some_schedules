# frozen_string_literal: true

module Accounts
  module Users
    class CreationService < Core::Service
      def self.create(params)
        User.create(params)
      end
    end
  end
end
