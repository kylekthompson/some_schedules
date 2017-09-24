# frozen_string_literal: true

module Resolvers
  module Company
    module Finder
      class << self
        def call(_company, args, _ctx)
          return plural_find(args) if args[:user_id].present?
          ::Company.find_by(slug: args[:slug]) if args[:slug].present?
        end

        private

        def plural_find(args)
          return ::Company.none unless args[:user_id].present?
          ::Company
            .includes(:company_users)
            .where(company_users: args.to_h.with_indifferent_access.slice(:user_id, :role).compact)
        end
      end
    end
  end
end
