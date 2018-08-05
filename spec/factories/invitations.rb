# frozen_string_literal: true

FactoryBot.define do
  factory :invitation do
    association :invited_by, factory: :user
    email { FFaker::Internet.email }
    accepted false
  end
end
