# frozen_string_literal: true

module Fields
  module CompanyField
    def self.field
      GraphQL::Field.define do
        name 'Company'
        description 'The company that owns the schedule'
        type Types::Objects::CompanyType
        argument :id, types.ID, 'The id of the company'
        resolve Resolvers::Company::Finder
      end
    end

    def self.plural_field
      GraphQL::Field.define do
        name 'Companies'
        description 'A list of companies'
        type !types[Types::Objects::CompanyType]
        argument :ids, !types[!types.ID], 'The ids of the companies'
        resolve Resolvers::Company::Finder
      end
    end
  end
end
