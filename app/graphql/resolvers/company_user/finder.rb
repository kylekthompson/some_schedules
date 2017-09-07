# frozen_string_literal: true

module Resolvers
  module CompanyUser
    module Finder
      class << self
        def call(_company_user, args, _ctx)
          return ::CompanyUser.where(id: args[:ids]) if args[:ids]
          ::CompanyUser.find_by(id: args[:id])
        end
      end
    end
  end
end
