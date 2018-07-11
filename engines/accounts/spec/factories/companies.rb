# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name&.gsub(/\W+/, "-") }

    trait :with_users do
      transient do
        user_count 1
      end

      users { build_list(:user, user_count) }
    end
  end
end
