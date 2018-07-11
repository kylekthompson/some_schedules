# frozen_string_literal: true

module API
  module Shifts
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      include API::Serialization

      delegate :can_create?, to: :ability
      delegate :shift, to: :result
      delegate :errors, to: :result
      delegate :success?, to: :result

      attr_reader :ability, :current_user, :params

      def initialize(current_user:, ability: Ability, **params)
        @current_user = current_user
        @ability = ability.new(current_user: current_user)
        @params = params

        raise API::Errors::NotAuthorizedError unless can_create?(params)
      end

      def status
        if success?
          :created
        else
          :unprocessable_entity
        end
      end

      def serialize
        if success?
          { shift: serialized(shift) }
        else
          { errors: serialized(errors) }
        end
      end

      private

      def result
        @result ||= ::Schedules::Shifts::CreationService.create(params)
      end
    end
  end
end
