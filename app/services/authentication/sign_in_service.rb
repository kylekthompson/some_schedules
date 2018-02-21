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
        success?: false,
        status: :unprocessable_entity,
        error: I18n.t!('services.authentication.sign_in.missing_email')
      )
    end

    def missing_password
      OpenStruct.new(
        success?: false,
        status: :unprocessable_entity,
        error: I18n.t!('services.authentication.sign_in.missing_password')
      )
    end

    def not_found
      OpenStruct.new(
        success?: false,
        status: :not_found,
        error: I18n.t!('services.authentication.sign_in.not_found')
      )
    end

    def signed_in(user)
      OpenStruct.new(
        authentication_context: Authentication::ContextService.build(user: user).context,
        success?: true,
        status: :ok,
        token: Token::EncodeService.encode(user: user).token
      )
    end
  end
end
