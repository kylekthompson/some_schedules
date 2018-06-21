# frozen_string_literal: true

module Schedules
  class ContextService
    attr_reader :after, :before, :user

    def self.build(user:, params:)
      new(user: user, params: params).result
    end

    def initialize(user:, params:)
      @after = parse_time(params[:after])
      @before = parse_time(params[:before])
      @user = user
    end

    def result
      return missing_param(:before) unless before.present?
      return missing_param(:after) unless after.present?
      return after_must_be_earlier_than_before unless after_earlier_than_before?

      schedule_context
    end

    private

    def parse_time(time)
      return nil if time.nil?
      return time if time.is_a?(Time)
      Time.parse(time)
    rescue ArgumentError
      nil
    end

    def after_earlier_than_before?
      after < before
    end

    def missing_param(param)
      OpenStruct.new(
        error: I18n.t!('services.schedules.context.missing_param', param: param),
        status: :unprocessable_entity,
        success?: false
      )
    end

    def after_must_be_earlier_than_before
      OpenStruct.new(
        error: I18n.t!('services.schedules.context.after_must_be_earlier_than_before'),
        status: :unprocessable_entity,
        success?: false
      )
    end

    def schedule_context
      OpenStruct.new(
        context: Schedules::Context.new(after: after, before: before, user: user),
        status: :ok,
        success?: true
      )
    end
  end
end
