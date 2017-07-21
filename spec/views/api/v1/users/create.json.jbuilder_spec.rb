# frozen_string_literal: true

require 'spec_helper'

describe 'api/v1/users/create.json.jbuilder', type: :view do
  subject(:rendered_user) { JSON.parse(rendered).deep_symbolize_keys }

  let(:user) { create(:user) }
  let(:expected_hash) do
    {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    }
  end

  before do
    assign(:user, user)
    render
  end

  it 'properly renders the user' do
    expect(rendered_user).to eq(expected_hash)
  end
end
