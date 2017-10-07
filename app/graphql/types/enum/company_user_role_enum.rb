# frozen_string_literal: true

module Types
  module Enum
    CompanyUserRoleEnum = GraphQL::EnumType.define do
      name 'CompanyUserRoleEnum'
      description 'The roles that a user can have in a company'

      value 'OWNER', 'The owner of the company', value: 'owner'
      value 'SUPERVISOR', 'A supervisor in the company', value: 'supervisor'
      value 'EMPLOYEE', 'An employee of the company', value: 'employee'
    end
  end
end
