# frozen_string_literal: true

module Resolvers
  module User
    module Finder
      class << self
        def call(obj, args, _ctx)
          return obj.user if obj.present? && obj.respond_to?(:user)
          ::User.find_by(id: args[:id]) if args[:id].present?
        end
      end
    end
  end
end
