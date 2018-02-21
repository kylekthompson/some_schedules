# frozen_string_literal: true

module Tokens
  class EncodeService
    attr_reader :user

    def self.encode(user:)
      new(user: user).result
    end

    def initialize(user:)
      @user = user
    end

    def result
      return missing_user unless user.present?
      encoded(encode_user)
    end

    private

    def encode_user
      JWT.encode({ email: user.email }, Rails.application.secrets.secret_key_base, 'HS256')
    end

    def missing_user
      OpenStruct.new(
        error: I18n.t!('services.token.encode.missing_user'),
        status: :unprocessable_entity,
        success?: false
      )
    end

    def encoded(token)
      OpenStruct.new(
        status: :created,
        success?: true,
        token: token
      )
    end
  end
end
