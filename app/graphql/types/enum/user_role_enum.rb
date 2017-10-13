# frozen_string_literal: true

module Types
  module Enum
    UserRoleEnum = GraphQL::EnumType.define do
      name 'UserRoleEnum'
      description 'The roles that a user can have in a company'

      value 'OWNER', 'The owner of the company', value: 'owner'
      value 'MANAGER', 'A manager in the company', value: 'manager'
      value 'SUPERVISOR', 'A supervisor in the company', value: 'supervisor'
      value 'EMPLOYEE', 'An employee of the company', value: 'employee'
    end
  end
end
