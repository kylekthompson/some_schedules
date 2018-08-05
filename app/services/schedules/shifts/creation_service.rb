# frozen_string_literal: true

module Schedules
  module Shifts
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      attr_reader :params

      delegate :errors, to: :shift

      def initialize(params)
        @params = params
      end

      def success?
        shift.valid? && shift.persisted?
      end

      def shift
        @shift ||= Shift.create(params)
      end
    end
  end
end
