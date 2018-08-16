# frozen_string_literal: true

module API
  class CurrentUserService
    static_facade :find, [:token!]

    def find
      return NilResult.new unless token.present?
      return NilResult.new unless user.persisted?

      Result.new(user: user)
    end

    private

    def user
      @user ||= ::Accounts::Users::LookupService.by(email: decoded_payload.email)
    end

    def decoded_payload
      @decoded_payload ||= ::Authentication::Tokens::DecodeService.decode(token: token)
    end

    class NilResult
      attr_reader :user, :token
    end

    class Result
      rattr_initialize [:user!]

      delegate :token, to: :user
    end
  end
end
