# frozen_string_literal: true

module Authentication
  class SignInService
    attr_reader :email, :password

    def self.sign_in(email:, password:)
      new(email: email, password: password).result
    end

    def initialize(email:, password:)
      @email = email
      @password = password
    end

    def result
      return missing_email unless email.present?
      return missing_password unless password.present?
      user = sign_in_user

      if user.present?
        signed_in(user)
      else
        not_found
      end
    end

    private

    def sign_in_user
      user = User.find_by(email: email)

      if user
        user.authenticate(password)
      else
        fake_password_check_to_prevent_timing_attacks
      end
    end

    def fake_password_check_to_prevent_timing_attacks
      User.new(password: 'fake_password').authenticate(password)
      nil
    end

    def missing_email
      OpenStruct.new(
        error: I18n.t!('services.authentication.sign_in.missing_email'),
        status: :unprocessable_entity,
        success?: false
      )
    end

    def missing_password
      OpenStruct.new(
        error: I18n.t!('services.authentication.sign_in.missing_password'),
        status: :unprocessable_entity,
        success?: false
      )
    end

    def not_found
      OpenStruct.new(
        error: I18n.t!('services.authentication.sign_in.not_found'),
        status: :not_found,
        success?: false
      )
    end

    def signed_in(user)
      OpenStruct.new(
        authentication_context: Authentication::ContextService.build(user: user).context,
        status: :ok,
        success?: true,
        token: Token::EncodeService.encode(user: user).token
      )
    end
  end
end
