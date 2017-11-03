# frozen_string_literal: true

module Resolvers
  module User
    module ShiftFinder
      class << self
        def call(user, _arguments, _context)
          Batch::ForeignKeyLoader.for(::Shift, :user_id).load(user.id)
        end
      end
    end
  end
end
