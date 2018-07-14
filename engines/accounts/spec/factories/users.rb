# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    email { FFaker::Internet.email }
    password "password"
    password_confirmation { password }
    role User::Role::EMPLOYEE

    trait :in_company do
      after(:create) do |user|
        create(:company, users: [user])
      end
    end

    User::Role::ALL.each do |role|
      trait role.to_sym do
        role { role }
      end
    end
  end
end
