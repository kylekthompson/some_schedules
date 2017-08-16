# frozen_string_literal: true

require 'spec_helper'

describe 'api/v1/users/create.json.jbuilder', type: :view do
  subject(:rendered_view) { JSON.parse(rendered).deep_symbolize_keys }

  let(:response) { APIResponse.new(status: status, errors: errors, value: value) }
  let(:errors) { { email: [] } }
  let(:status) { :created }
  let(:value) { create(:user) }
  let(:token) { instance_double(Knock::AuthToken) }
  let(:token_string) { 'token' }
  let(:expected_hash) do
    {
      errors: errors,
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[status],
      value: {
        id: value.id,
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        token: token_string,
        created_at: value.created_at.iso8601(3),
        updated_at: value.updated_at.iso8601(3)
      }
    }
  end

  before do
    assign(:api_response, response)
    allow(Knock::AuthToken).to receive(:new).and_return(token)
    allow(token).to receive(:token).and_return(token_string)
    render
  end

  it 'properly renders' do
    expect(rendered_view).to eq(expected_hash)
  end
end
