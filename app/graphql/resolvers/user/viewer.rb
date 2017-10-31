# frozen_string_literal: true

module Resolvers
  module User
    module Viewer
      class << self
        def call(_obj, _args, ctx)
          ctx[:current_user]
        end
      end
    end
  end
end
