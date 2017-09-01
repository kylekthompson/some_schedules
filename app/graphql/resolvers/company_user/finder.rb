# frozen_string_literal: true

module Resolvers
  module CompanyUser
    module Finder
      class << self
        def call(_obj, args, _ctx)
          return find_many(args[:ids]) if args[:ids]
          find_one(args[:id])
        end

        private

        def find_many(ids)
          ::CompanyUser.where(id: ids)
        end

        def find_one(id)
          ::CompanyUser.find_by(id: id)
        end
      end
    end
  end
end
