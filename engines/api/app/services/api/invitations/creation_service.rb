# frozen_string_literal: true

module API
  module Invitations
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      include API::Serialization

      delegate :can_create?, to: :ability
      delegate :invitation, to: :result
      delegate :errors, to: :result
      delegate :success?, to: :result

      attr_reader :ability, :current_user, :email

      def initialize(current_user:, email:, ability: Ability)
        @current_user = current_user
        @email = email
        @ability = ability.new(current_user: current_user)

        raise API::Errors::NotAuthorizedError unless can_create?
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
          { invitation: serialized(invitation) }
        else
          { errors: serialized(errors) }
        end
      end

      private

      def result
        @result ||= ::Accounts::Invitations::CreationService.create(email: email, invited_by: current_user)
      end
    end
  end
end
