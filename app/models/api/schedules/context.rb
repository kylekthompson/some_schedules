# frozen_string_literal: true

module API
  module Schedules
    class Context
      extend ActiveModel::Naming

      include ActiveModel::Serialization
      include ActiveModel::Validations

      pattr_initialize %i[user! after! before!]

      validates :user, presence: true
      validates :after, presence: true
      validates :before, presence: true
      validate :after_earlier_than_before?

      def users
        return nil unless valid?

        @users ||= ::Accounts::Users::LookupService.viewable_by(user: user)
      end

      def shifts
        return nil unless valid?

        @shifts ||= ::Schedules::Shifts::LookupService.viewable_by(user: user).after(after).before(before)
      end

      private

      def after_earlier_than_before?
        return unless after.present? && before.present?
        return if after < before

        errors.add(:after, :must_be_earlier_than_before)
      end
    end
  end
end
