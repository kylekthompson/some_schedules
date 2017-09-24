# frozen_string_literal: true

module Fields
  module CompanyField
    def self.field
      GraphQL::Field.define do
        name 'Company'
        description 'The company that owns the schedule'
        type Types::Objects::CompanyType
        argument :slug, types.String, 'The slug of the company'
        resolve Resolvers::Company::Finder
      end
    end
  end
end
