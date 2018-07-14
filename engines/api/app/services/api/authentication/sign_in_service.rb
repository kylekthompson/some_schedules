# frozen_string_literal: true

module API
  module Authentication
    class SignInService < Core::Service
      def self.sign_in(params)
        new(params)
      end

      include API::Serialization
      include ActiveModel::Validations

      validates :email, presence: true
      validates :password, presence: true
      validate :user_is_authenticated

      def initialize(email:, password:)
        @email = email
        @password = password

        validate
      end

      def status
        if valid?
          :ok
        else
          :unauthorized
        end
      end

      def serialize
        if valid?
          { context: serialized(context) }
        else
          { errors: serialized(errors) }
        end
      end

      def token
        return nil unless valid?
        ::Authentication::Tokens::EncodeService.encode(user: user).token
      end

      private

      attr_reader :email, :password

      def context
        @context ||= Context.new(user: user)
      end

      def user
        @user ||= ::Accounts::Users::LookupService.by(email: email)
      end

      def user_is_authenticated
        return if user.authenticate(password)
        errors.add(:user, :invalid_email_or_password)
      end
    end
  end
end
