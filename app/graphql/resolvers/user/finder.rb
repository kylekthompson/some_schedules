# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          return Batch::RecordLoader.for(::User).load(object.user_id) if object.respond_to?(:user_id)
          Batch::RecordLoader.for(::User).load(arguments[:id]) if arguments[:id].present?
        end
      end
    end
  end
end
