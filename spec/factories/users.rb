# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
    password_confirmation { password }
    association :company
    role :employee

    User.roles.keys.each do |role|
      trait role.to_sym do
        role { role.to_sym }
      end
    end

    trait :with_shifts do
      transient do
        shift_count 1
      end

      after(:create) do |user, transients|
        create_list(:shift, transients.shift_count, user: user)
      end
    end
  end
end
