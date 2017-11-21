# frozen_string_literal: true

module Types
  module Scalar
    DateType = GraphQL::ScalarType.define do
      name 'Date'
      description 'A date string'

      coerce_input lambda { |date, _context|
        begin
          Time.parse(date)
        rescue ArgumentError
          nil
        end
      }

      coerce_result lambda { |value, _context|
        value&.to_s
      }
    end
  end
end
