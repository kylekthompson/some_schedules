# frozen_string_literal: true

module Accounts
  module Users
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      attr_reader :params

      delegate :errors, to: :user

      def initialize(params)
        @params = params
      end

      def success?
        user.valid? && user.persisted?
      end

      def user
        @user ||= User.create(params)
      end
    end
  end
end
