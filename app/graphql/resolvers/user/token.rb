# frozen_string_literal: true

module Resolvers
  module User
    class Token
      include ActiveModel::Validations

      validates :email, presence: true
      validates :password, presence: true
      validate :correct_password

      attr_accessor :email, :user, :password

      def self.call(_obj, args, _ctx)
        new(args).to_h
      end

      def initialize(args)
        @email = args[:email]
        @user = ::User.find_by(email: email)
        @password = args[:password]
      end

      def to_h
        return { errors: errors.messages } unless valid?
        { token: token }
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
