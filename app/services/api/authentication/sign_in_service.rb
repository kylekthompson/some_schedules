# frozen_string_literal: true

module API
  module Authentication
    class SignInService < Core::Service
      static_facade :sign_in, %i[email! password!]

      def sign_in
        return NilResult.new unless authenticated?
        Result.new(user: user)
      end

      private

      def user
        @user ||= ::Accounts::Users::LookupService.by(email: email)
      end

      def authenticated?
        user.authenticate(password)
      end

      class NilResult
        attr_reader :token

        def context
          API::Authentication::Context.new(user: nil)
        end
      end

      class Result
        pattr_initialize [:user!]

        delegate :token, to: :user

        def context
          @context ||= API::Authentication::Context.new(user: user)
        end
      end
    end
  end
end
