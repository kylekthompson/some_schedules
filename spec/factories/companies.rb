# frozen_string_literal: true

FactoryGirl.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name.gsub(/\W+/, '-') }
  end
end
