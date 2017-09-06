# frozen_string_literal: true

module Resolvers
  module Company
    module Creator
      class << self
        def call(_obj, args, ctx)
          if ctx[:current_user].present?
            { company: create(args, ctx[:current_user]) }
          else
            { company: authentication_error }
          end
        end

        private

        def create(args, current_user)
          create_company_and_assign_owner!(args, current_user)
        rescue StandardError
          nil
        end

        def authentication_error
          company = ::Company.new
          company.errors.add('', 'Authentication is required')
          company
        end

        def create_company_and_assign_owner!(args, current_user)
          company = nil
          Company.transaction do
            company = ::Company.create!(params(args))
            company.company_users.create!(role: :owner, user: current_user)
          end
          company
        end

        def params(args)
          ActionController::Parameters.new(args.to_h).permit(
            :name,
            :slug
          )
        end
      end
    end
  end
end
