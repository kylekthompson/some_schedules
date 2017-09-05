# frozen_string_literal: true

module Fields
  module CompanyUserField
    def self.field
      GraphQL::Field.define do
        name 'CompanyUser'
        description 'The relation between companies and users'
        type Types::Objects::CompanyUserType
        argument :id, !types.ID, 'The id of the companyUser'
        resolve Resolvers::CompanyUser::Finder
      end
    end

    def self.plural_field
      GraphQL::Field.define do
        name 'CompanyUsers'
        description 'A list of companyUsers'
        type !types[Types::Objects::CompanyUserType]
        argument :ids, !types[!types.ID], 'The ids of the companyUsers'
        resolve Resolvers::CompanyUser::Finder
      end
    end
  end
end
