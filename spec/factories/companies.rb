# frozen_string_literal: true

FactoryGirl.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name.gsub(/\W+/, '-') }

    User.roles.keys.each do |role|
      trait "with_#{role}".to_sym do
        after(:create) do |company|
          company.users << create(:user, company: company, role: role.to_sym)
        end
      end
    end
  end
end
