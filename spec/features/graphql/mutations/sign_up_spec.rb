# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'mutation { signUp }' do
  subject(:mutation) do
    <<~GRAPHQL
      mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
          company {
            id
          }
          companyErrors
          errors
          token
          user {
            id
          }
          userErrors
        }
      }
    GRAPHQL
  end

  let(:execution_result) do
    SomeSchedulesSchema.execute(
      mutation,
      variables: deep_camelize_keys(variables.with_indifferent_access),
      context: context
    ).with_indifferent_access
  end
  let(:data) { execution_result[:data] }
  let(:errors) { execution_result[:errors] }
  let(:variables) { { input: { company: company_input, user: user_input } } }
  let(:company_input) { attributes_for(:company) }
  let(:user_input) { attributes_for(:user).tap { |attributes| attributes.delete(:role) } }
  let(:context) { {} }

  specify { expect(errors).to be_nil }
  specify { expect(data[:signUp][:company]).not_to be_nil }
  specify { expect(data[:signUp][:companyErrors]).to be_nil }
  specify { expect(data[:signUp][:errors]).to be_nil }
  specify { expect(data[:signUp][:token]).not_to be_nil }
  specify { expect(data[:signUp][:user]).not_to be_nil }
  specify { expect(data[:signUp][:userErrors]).to be_nil }
end
