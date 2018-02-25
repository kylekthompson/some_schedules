# frozen_string_literal: true

module Tokens
  class DecodeService
    attr_reader :token

    def self.decode(token:)
      new(token: token).result
    end

    def initialize(token:)
      @token = token
    end

    def result
      return missing_token unless token.present?
      decoded(decode_token!)
    rescue JWT::DecodeError
      decode_error
    end

    private

    def decode_token!
      payload, header = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      OpenStruct.new(payload: OpenStruct.new(payload), header: OpenStruct.new(header))
    end

    def missing_token
      OpenStruct.new(
        error: I18n.t!('services.token.decode.missing_token'),
        status: :unauthorized,
        success?: false
      )
    end

    def decode_error
      OpenStruct.new(
        error: I18n.t!('services.token.decode.error'),
        status: :unauthorized,
        success?: false
      )
    end

    def decoded(token)
      OpenStruct.new(
        header: token.header,
        payload: token.payload,
        status: :ok,
        success?: true
      )
    end
  end
end
