# frozen_string_literal: true

module Accounts
  module Invitations
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      attr_reader :params

      delegate :errors, to: :invitation

      def initialize(params)
        @params = params
      end

      def success?
        invitation.valid? && invitation.persisted?
      end

      def invitation
        @invitation ||= Invitation.create(params)
      end
    end
  end
end
