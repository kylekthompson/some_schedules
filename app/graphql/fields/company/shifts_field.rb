# frozen_string_literal: true

module Fields
  module Company
    module ShiftsField
      def self.field
        GraphQL::Field.define do
          name 'Shifts'
          description 'The shifts that are part of a company'
          type types[Types::Object::ShiftType]
          argument :after, Types::Scalar::DateType, 'Return only shifts after this time'
          argument :before, Types::Scalar::DateType, 'Return only shifts before this time'
          resolve Resolvers::Company::ShiftFinder
        end
      end
    end
  end
end
