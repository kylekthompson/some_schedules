# frozen_string_literal: true

module API
  module Schedules
    class Context
      include ActiveModel::Serialization

      attr_reader :after, :before, :user

      def initialize(after:, before:, user:)
        @after = after
        @before = before
        @user = user
      end

      def users
        @users ||= ::Accounts::Users::LookupService.viewable_by(user: user)
      end

      def shifts
        @shifts ||= ::Schedules::Shifts::LookupService.viewable_by(user: user).after(after).before(before)
      end
    end
  end
end
