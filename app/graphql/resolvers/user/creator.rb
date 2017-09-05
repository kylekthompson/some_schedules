# frozen_string_literal: true

module Resolvers
  module User
    module Creator
      class << self
        def call(_obj, args, _ctx)
          { user: ::User.create(params(args)) }
        end

        private

        def params(args)
          ActionController::Parameters.new(args.to_h).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation
          )
        end
      end
    end
  end
end
