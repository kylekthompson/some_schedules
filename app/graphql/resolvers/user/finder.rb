# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          user = context[:current_user]
          return load_for_object(object, user) if object.respond_to?(:user_id)
          load_for_arguments(arguments, user) if arguments[:id].present?
        end

        def load_for_object(object, user)
          Batch::RecordLoader.for(::User, user: user).load(object.user_id)
        end

        def load_for_arguments(arguments, user)
          Batch::RecordLoader.for(::User, user: user).load(arguments[:id])
        end
      end
    end
  end
end
