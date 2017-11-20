# frozen_string_literal: true

module Resolvers
  module User
    module Viewer
      class << self
        ##
        # Returns the logged in user or nil
        #
        # [1] pry(main)> Resolvers::User::Viewer.call(nil, nil, { current_user: User.first })
        # => #<User>
        # [2] pry(main)> Resolvers::User::Viewer.call(nil, nil, { current_user: nil })
        # => nil
        def call(_object, _arguments, context)
          context[:current_user]
        end
      end
    end
  end
end
