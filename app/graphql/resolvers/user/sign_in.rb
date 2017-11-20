# frozen_string_literal: true

module Resolvers
  module User
    class SignIn
      include ActiveModel::Validations

      validates :email, presence: true
      validates :password, presence: true
      validate :correct_password

      attr_accessor :email, :user, :password

      ##
      # An entry point that simulates a Proc to sign a user in
      #
      # [1] pry(main)> arguments = { email: 'test@example.com', password: 'password' }
      # [2] pry(main)> Resolvers::User::SignIn.call(nil, arguments, nil)
      # => { token: '...', user: #<User email: 'test@example.com'> }
      def self.call(_object, arguments, _context)
        new(arguments).to_h
      end

      ##
      # Creates a new instance of Resolvers::User::SignIn
      #
      # [1] pry(main)> arguments = { email: 'test@example.com', password: 'password' }
      # [2] pry(main)> Resolvers::User::SignIn.new(arguments)
      # => #<Resolvers::User::SignIn>
      def initialize(arguments)
        @email = arguments[:email]
        @user = ::User.find_by(email: email)
        @password = arguments[:password]
      end

      ##
      # Returns the hash representation of the result of signing a user in (either errors or a user and token)
      #
      # [1] pry(main)> arguments = { email: 'test@example.com', password: 'password' }
      # [2] pry(main)> resolver = Resolvers::User::SignIn.new(arguments)
      # [3] pry(main)> resolver.to_h
      # => { token: '...', user: #<User> }
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
