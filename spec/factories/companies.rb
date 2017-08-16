# frozen_string_literal: true

FactoryGirl.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name.gsub(/\W+/, '-') }

    trait :with_owner do
      after(:create) do |company|
        company.company_users << create(:company_user, :owner)
      end
    end
  end
end
