require 'spec_helper'

describe 'users/create.json.jbuilder', type: :view do
  let(:user) { create(:user) }

  subject(:rendered_user) { JSON.parse(rendered).deep_symbolize_keys }

  before do
    assign(:user, user)
    render
  end

  it 'properly renders the user' do
    expect(rendered_user).to eq({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    })
  end
end
