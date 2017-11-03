# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(_object, arguments, context)
          return unless context[:current_user].present?
          Batch::RecordLoader.for(::User).load(arguments[:id]) if arguments[:id].present?
        end
      end
    end
  end
end
