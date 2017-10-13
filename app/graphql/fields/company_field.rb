# frozen_string_literal: true

module Fields
  module CompanyField
    def self.field
      GraphQL::Field.define do
        name 'Company'
        description 'The company that owns the schedule'
        type Types::Object::CompanyType
        argument :slug, types.String, 'The slug of the company'
        resolve Resolvers::Company::Finder
      end
    end

    def self.plural_field
      GraphQL::Field.define do
        name 'Companies'
        description 'A list of companies'
        type !types[Types::Object::CompanyType]
        argument :userId, !types.ID, 'The id of the user of the companies', as: :user_id
        argument :role, Types::Enum::UserRoleEnum, 'The role the user of the company has'
        resolve Resolvers::Company::Finder
      end
    end
  end
end
