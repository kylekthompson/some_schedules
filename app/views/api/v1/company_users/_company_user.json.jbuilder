json.id company_user.id
json.role CompanyUser.roles[company_user.role]
json.user do
  json.partial! 'api/v1/users/user', user: company_user.user
end
