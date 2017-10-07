# frozen_string_literal: true

module Types
  module Input
    CompanyInputType = GraphQL::InputObjectType.define do
      name "CompanyInputType"

      input_field :name, !types.String
      input_field :slug, !types.String
    end
  end
end
