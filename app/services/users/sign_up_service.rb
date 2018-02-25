# frozen_string_literal: true

module Users
  class SignUpService
    attr_reader :current_user, :params

    def self.sign_up(current_user: nil, params:)
      new(current_user: current_user, params: params).result
    end

    def initialize(current_user: nil, params:)
      @current_user = current_user
      @params = params
    end

    def result
      user = User.new(params)

      return unauthorized unless can_create?(user)
      return created(user) if user.save

      errors(user)
    end

    private

    def can_create?(user)
      Policy.for(current_user: current_user, subject: user).can_create?
    end

    def unauthorized
      OpenStruct.new(
        error: I18n.t!('services.users.sign_up.unauthorized'),
        status: :forbidden,
        success?: false
      )
    end

    def created(user)
      OpenStruct.new(
        user: user,
        status: :created,
        success?: true
      )
    end

    def errors(user)
      OpenStruct.new(
        errors: user.errors.messages,
        status: :unprocessable_entity,
        success?: false
      )
    end
  end
end
