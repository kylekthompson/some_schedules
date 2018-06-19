# frozen_string_literal: true

module Shifts
  class CreationService
    attr_reader :current_user, :params, :user

    def self.create(current_user:, params:)
      new(current_user: current_user, params: params).result
    end

    def initialize(current_user:, params:)
      @current_user = current_user
      @user = User.find_by(id: params[:user_id])
      @params = params.except(:user_id)
    end

    def result
      shift = Shift.new(params.merge(user: user))

      return unauthorized unless can_create?(shift)
      return created(shift) if shift.save

      errors(shift)
    end

    private

    def can_create?(shift)
      Policy.for(current_user: current_user, subject: shift).can_create?
    end

    def unauthorized
      OpenStruct.new(
        error: I18n.t!('services.shifts.creation.unauthorized'),
        status: :forbidden,
        success?: false
      )
    end

    def created(shift)
      OpenStruct.new(
        shift: shift,
        status: :created,
        success?: true
      )
    end

    def errors(shift)
      OpenStruct.new(
        errors: shift.errors.messages,
        status: :unprocessable_entity,
        success?: false
      )
    end
  end
end
