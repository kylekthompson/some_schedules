# frozen_string_literal: true

json.id company.id
json.name company.name
json.slug company.slug
json.company_users do
  json.array! company.company_users.each do |company_user|
    json.partial! 'api/v1/company_users/company_user', company_user: company_user
  end
end
json.created_at company.created_at
json.updated_at company.updated_at
