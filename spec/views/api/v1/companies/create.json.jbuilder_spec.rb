# frozen_string_literal: true

require 'spec_helper'

describe 'api/v1/companies/create.json.jbuilder', type: :view do
  subject(:rendered_view) { JSON.parse(rendered).deep_symbolize_keys }

  let(:response) { APIResponse.new(status: status, errors: errors, value: value) }
  let(:errors) { { email: [] } }
  let(:status) { :created }
  let(:value) { create(:company, :with_owner) }
  let(:expected_hash) do
    {
      errors: errors,
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[status],
      value: {
        id: value.id,
        name: value.name,
        slug: value.slug,
        company_users: [
          {
            id: value.company_users.first.id,
            role: CompanyUser.roles[value.company_users.first.role],
            user_id: value.company_users.first.user.id,
            company_id: value.id,
            created_at: value.company_users.first.created_at.iso8601(3),
            updated_at: value.company_users.first.updated_at.iso8601(3)
          }
        ],
        created_at: value.created_at.iso8601(3),
        updated_at: value.updated_at.iso8601(3)
      }
    }
  end

  before do
    assign(:api_response, response)
    render
  end

  it 'properly renders' do
    expect(rendered_view).to eq(expected_hash)
  end
end