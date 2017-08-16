# frozen_string_literal: true

json.errors @api_response.errors
json.status @api_response.status
json.value do
  if @api_response.value.present?
    json.partial! 'company_create', company: @api_response.value
  end
end
