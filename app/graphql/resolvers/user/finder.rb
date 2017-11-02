# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(_obj, args, _ctx)
          Batch::RecordLoader.for(::User).load(args[:id]) if args[:id].present?
        end
      end
    end
  end
end
