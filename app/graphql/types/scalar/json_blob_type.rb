# frozen_string_literal: true

module Types
  module Scalar
    JsonBlobType = GraphQL::ScalarType.define do
      name 'JsonBlob'
      description 'A generic JSON blob'

      coerce_result ->(value, _context) { value }
    end
  end
end
