# frozen_string_literal: true

RSpec.shared_context 'with authentication' do
  let(:current_user) { create(:user) }
  let(:password) { 'password' }

  def sign_in
    post(
      '/api/authentication/sign_in',
      params: { authentication: { email: current_user.email, password: password } }
    )
  end
end
