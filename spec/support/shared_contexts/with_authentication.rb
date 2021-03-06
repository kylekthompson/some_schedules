# frozen_string_literal: true

RSpec.shared_context "with authentication" do
  include_context "with headers"

  let(:current_user) { create(:user, :in_company) }
  let(:password) { "password" }

  def sign_in
    post(
      "/api/authentication/sign_in",
      params: { authentication: { email: current_user.email, password: password } },
      headers: headers,
    )
  end
end
