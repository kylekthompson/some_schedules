# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    name { FFaker::Company.name }
    slug { name.gsub(/\W+/, '-') }

    User.roles.each_key do |role|
      trait "with_#{role}".to_sym do
        after(:create) do |company|
          create(:user, company: company, role: role.to_sym)
        end
      end
    end
  end
end
