# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'mutation { createInvitation }' do
  subject(:mutation) do
    <<~GRAPHQL
      mutation createInvitation($input: CreateInvitationInput!) {
        createInvitation(input: $input) {
          errors
          invitation {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:variables) { { input: { email: email } } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { create(:user) }
  let(:email) { FFaker::Internet.email }

  include_context 'with mutation execution setup'
  include_context 'with stubbed policies'

  it 'creates an invitation for the user' do
    expect { execution_result }.to change { current_user.invitations.count }.by(1)
  end

  describe 'authentication' do
    context 'when there is a current user' do
      let(:current_user) { create(:user) }

      specify { expect(errors).to be_nil }
      specify { expect(data[:createInvitation][:errors]).to be_nil }
      specify { expect(data[:createInvitation][:invitation]).not_to be_nil }
    end

    context 'when there is not a current user' do
      let(:current_user) { nil }

      specify { expect(errors.pluck(:message)).to include(match(/authentication/i)) }
      specify { expect(data[:createInvitation]).to be_nil }
    end
  end
end
