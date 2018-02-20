# frozen_string_literal: true

module Resolvers
  module User
    class SignIn
      include ActiveModel::Validations

      validates :email, presence: true
      validates :password, presence: true
      validate :correct_password

      attr_accessor :email, :user, :password

      def self.call(_object, arguments, _context)
        new(arguments).to_h
      end

      def initialize(arguments)
        @email = arguments[:email]
        @user = ::User.find_by(email: email)
        @password = arguments[:password]
      end

      def to_h
        return { errors: errors.messages } unless valid?
        { token: token, user: user }
      end

      private

      def token
        Knock::AuthToken.new(payload: user.to_token_payload).token
      end

      def correct_password
        return errors.add(:email, 'was not found') unless user.present?
        errors.add(:password, 'was incorrect') unless user.authenticate(password)
      end
    end
  end
end
