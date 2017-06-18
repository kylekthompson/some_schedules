# frozen_string_literal: true

require 'spec_helper'

describe 'api/v1/users/errors.json.jbuilder', type: :view do
  let(:user) { build(:user, first_name: nil) }

  before do
    user.valid?
    assign(:user, user)
    render
  end

  it 'renders the shared/errors partial' do
    expect(view).to render_template(partial: 'shared/_errors')
  end
end
