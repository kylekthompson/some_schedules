# frozen_string_literal: true

module Resolvers
  module Shift
    class Creator
      include ActiveModel::Validations

      validates :user, presence: true

      attr_accessor :end_time, :shift, :start_time, :user

      def self.call(_object, arguments, context)
        raise GraphQL::ExecutionError, 'Authentication required.' unless context[:current_user].present?
        new(arguments).to_h
      end

      def initialize(arguments)
        @end_time = arguments[:end_time]
        @start_time = arguments[:start_time]
        @user = ::User.find_by(id: arguments[:user_id])
      end

      def to_h
        return { errors: errors.messages } unless valid?
        create_shift
        return { errors: shift.errors.messages } unless shift.valid?
        { shift: shift }
      end

      private

      def create_shift
        @shift = user.shifts.create(end_time: end_time, start_time: start_time)
      end
    end
  end
end
