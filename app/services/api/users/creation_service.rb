# frozen_string_literal: true

module API
  module Users
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      include API::Serialization

      delegate :can_create?, to: :ability
      delegate :user, to: :result
      delegate :errors, to: :result
      delegate :success?, to: :result

      attr_reader :ability, :current_user, :params

      def initialize(current_user:, ability: Ability, **params)
        @current_user = current_user
        @ability = ability.new(current_user: current_user)
        @params = params

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
          { user: serialized(user) }
        else
          { errors: serialized(errors) }
        end
      end

      def token
        return nil unless success?
        ::Authentication::Tokens::EncodeService.encode(user: user).token
      end

      private

      def result
        @result ||= ::Accounts::Users::CreationService.create(params.merge(role: User::Role::OWNER))
      end
    end
  end
end
