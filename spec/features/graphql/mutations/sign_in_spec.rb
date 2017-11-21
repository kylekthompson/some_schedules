# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'mutation { signIn }' do
  subject(:mutation) do
    <<~GRAPHQL
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          errors
          token
          user {
            email
          }
        }
      }
    GRAPHQL
  end

  let(:variables) { { input: { email: email, password: password } } }
  let(:context) { {} }
  let(:actual_email) { FFaker::Internet.email }
  let(:actual_password) { FFaker::Internet.password }

  include_context 'with mutation execution setup'

  before do
    create(:user, email: actual_email, password: actual_password)
  end

  context 'when the email and password are correct' do
    let(:email) { actual_email }
    let(:password) { actual_password }

    specify { expect(data[:signIn][:errors]).to be_nil }
    specify { expect(data[:signIn][:token]).not_to be_nil }
    specify { expect(data[:signIn][:user][:email]).to eq(email) }
  end

  context 'when the password is not correct' do
    let(:email) { actual_email }
    let(:password) { FFaker::Internet.password }

    specify { expect(data[:signIn][:errors][:password]).not_to be_nil }
    specify { expect(data[:signIn][:token]).to be_nil }
    specify { expect(data[:signIn][:user]).to be_nil }
  end

  context 'when the email does not exist' do
    let(:email) { FFaker::Internet.email }
    let(:password) { FFaker::Internet.password }

    specify { expect(data[:signIn][:errors][:email]).not_to be_nil }
    specify { expect(data[:signIn][:token]).to be_nil }
    specify { expect(data[:signIn][:user]).to be_nil }
  end
end
