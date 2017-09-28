# frozen_string_literal: true

FactoryGirl.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name.gsub(/\W+/, '-') }

    CompanyUser.roles.keys.each do |role|
      trait "with_#{role}".to_sym do
        after(:create) do |company|
          company.company_users << create(:company_user, role.to_sym)
        end
      end
    end
  end
end
