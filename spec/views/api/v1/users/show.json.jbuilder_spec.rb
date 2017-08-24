# frozen_string_literal: true

require 'spec_helper'

describe 'api/v1/users/show.json.jbuilder', type: :view do
  subject(:rendered_view) { JSON.parse(rendered).deep_symbolize_keys }

  let(:response) { APIResponse.new(status: status, errors: errors, value: value) }
  let(:errors) { { email: [] } }
  let(:status) { :ok }
  let(:value) { create(:user) }
  let(:expected_hash) do
    {
      errors: errors,
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[status],
      value: {
        id: value.id,
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
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
