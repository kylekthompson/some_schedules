# frozen_string_literal: true

FactoryGirl.define do
  factory :company_user do
    association :company
    association :user
    role CompanyUser.roles[:employee]

    CompanyUser.roles.each do |name, value|
      trait name do
        role value
      end
    end
  end
end
