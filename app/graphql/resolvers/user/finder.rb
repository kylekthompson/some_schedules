# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(object, arguments, context)
          Resolvers.require_authentication!(context)
          current_user = context[:current_user]
          return load_for_object(object, current_user) if object.respond_to?(:user_id)
          load_for_arguments(arguments, current_user) if arguments[:id].present?
        end

        private

        def load_for_object(object, current_user)
          Batch::RecordLoader.for(::User, user: current_user).load(object.user_id)
        end

        def load_for_arguments(arguments, current_user)
          Batch::RecordLoader.for(::User, user: current_user).load(arguments[:id])
        end
      end
    end
  end
end
