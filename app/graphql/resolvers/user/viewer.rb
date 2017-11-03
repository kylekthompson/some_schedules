# frozen_string_literal: true

module Resolvers
  module User
    module Viewer
      class << self
        def call(_object, _arguments, context)
          context[:current_user]
        end
      end
    end
  end
end
