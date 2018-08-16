# frozen_string_literal: true

module Accounts
  module Companies
    class CreationService < Core::Service
      def self.create(user:, **params)
        raise API::Errors::NotAuthorizedError unless user.company.blank? && user.owner?

        Company.create(params.merge(users: [user]))
      end
    end
  end
end
