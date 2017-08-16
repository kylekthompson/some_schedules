# frozen_string_literal: true

json.id company_user.id
json.company_id company_user.company_id
json.user_id company_user.user_id
json.role CompanyUser.roles[company_user.role]
json.created_at company_user.created_at
json.updated_at company_user.updated_at
