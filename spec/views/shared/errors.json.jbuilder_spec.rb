require 'spec_helper'

describe 'shared/_errors.json.jbuilder', type: :view do
  subject(:rendered_errors) { JSON.parse(rendered).deep_symbolize_keys }

  let(:user) { build(:user, first_name: nil) }
  let(:expected_hash) do
    {
      errors: {
        first_name: [
          "can't be blank"
        ]
      }
    }
  end

  before do
    user.valid?
    without_partial_double_verification { allow(view).to receive(:errors).and_return(user.errors) }
    render
  end

  it 'properly renders the errors' do
    expect(rendered_errors).to eq(expected_hash)
  end
end
