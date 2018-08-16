# frozen_string_literal: true

module API
  module Schedules
    class ContextService < Core::Service
      static_facade :build, %i[user! after! before!]

      def build
        API::Schedules::Context.new(
          user: user,
          after: Core::Time.new(after),
          before: Core::Time.new(before),
        ).tap(&:validate)
      end
    end
  end
end
