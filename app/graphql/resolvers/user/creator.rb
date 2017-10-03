# frozen_string_literal: true

module Resolvers
  module User
    class Creator
      include ActiveModel::Validations

      validates :params, presence: true

      attr_accessor :params, :user

      def self.call(_obj, args, _ctx)
        new(args).to_h
      end

      def initialize(args)
        @params = ActionController::Parameters.new(args.to_h).permit(
          :first_name,
          :last_name,
          :email,
          :password,
          :password_confirmation
        )
      end

      def to_h
        create_user
        return { errors: user.errors.messages } unless user.valid?
        { token: token, user: user }
      end

      private

      def create_user
        @user = ::User.create(params)
      end

      def token
        Knock::AuthToken.new(payload: user.to_token_payload).token
      end
    end
  end
end
