# frozen_string_literal: true

module Authentication
  class ContextService
    attr_reader :user

    def self.build(user:)
      new(user: user).result
    end

    def initialize(user:)
      @user = user
    end

    def result
      authentication_context
    end

    private

    def authentication_context
      OpenStruct.new(
        context: Authentication::Context.new(user: user),
        status: :ok,
        success?: true
      )
    end
  end
end
