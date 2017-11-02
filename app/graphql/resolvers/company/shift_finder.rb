# frozen_string_literal: true

module Resolvers
  module Company
    module ShiftFinder
      class << self
        def call(company, _arguments, _context)
          Batch::ForeignKeyLoader.for(::User, :company_id).load(company.id).then do |users|
            Batch::ForeignKeyLoader.for(::Shift, :user_id).load(users.pluck(:id))
          end
        end
      end
    end
  end
end
