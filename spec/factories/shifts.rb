# frozen_string_literal: true

FactoryGirl.define do
  factory :shift do
    association :user
    start_time { Time.current.at_beginning_of_hour }
    end_time { Time.current.at_beginning_of_hour + 8.hours }
  end
end
