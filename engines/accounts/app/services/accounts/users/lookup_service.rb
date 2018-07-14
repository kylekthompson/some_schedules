# frozen_string_literal: true

module Accounts
  module Users
    class LookupService < Core::Service
      VIEWABLE_BY_ROLE = {
        User::Role::OWNER => ViewableByManager,
        User::Role::MANAGER => ViewableByManager,
        User::Role::EMPLOYEE => ViewableByEmployee,
        nil => ViewableByNilUser,
      }.freeze

      def self.by(params)
        User.find_by(params) || NilUser.new
      end

      def self.viewable_by(user:)
        VIEWABLE_BY_ROLE.fetch(user&.role).all(user)
      end
    end
  end
end
