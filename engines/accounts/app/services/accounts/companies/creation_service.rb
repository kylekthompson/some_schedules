# frozen_string_literal: true

module Accounts
  module Companies
    class CreationService < Core::Service
      def self.create(params)
        new(params)
      end

      attr_reader :user, :params

      delegate :errors, to: :company

      def initialize(user:, **params)
        @user = user
        @params = params
      end

      def success?
        company.valid? && company.persisted?
      end

      def company
        @company ||= create_company
      end

      private

      def create_company
        Company.new(params).tap do |c|
          c.users << user
          c.save
        end
      end
    end
  end
end
