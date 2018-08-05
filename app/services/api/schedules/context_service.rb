# frozen_string_literal: true

module API
  module Schedules
    class ContextService < Core::Service
      def self.build(params)
        new(params)
      end

      include ActiveModel::Validations
      include API::Serialization

      validates :user, presence: true
      validates :after, presence: true
      validates :before, presence: true
      validate :after_earlier_than_before?

      def initialize(user:, after:, before:)
        @user = user
        @after = Core::Time.new(after)
        @before = Core::Time.new(before)

        validate
      end

      def status
        if valid?
          :ok
        else
          :unprocessable_entity
        end
      end

      def serialize
        if valid?
          { context: serialized(context) }
        else
          { errors: serialized(errors) }
        end
      end

      private

      attr_reader :user, :after, :before

      def context
        @context ||= API::Schedules::Context.new(user: user, after: after, before: before)
      end

      def after_earlier_than_before?
        return unless after.present? && before.present?
        return if after < before
        errors.add(:after, :must_be_earlier_than_before)
      end
    end
  end
end
