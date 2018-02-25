# frozen_string_literal: true

module Schedules
  class Context
    include ActiveModel::Serialization

    attr_reader :after, :before, :user

    def initialize(after:, before:, user:)
      @after = after
      @before = before
      @user = user
    end

    def users
      @users ||= Policy.for(current_user: user, subject: User).scope
    end

    def shifts
      @shifts ||= Policy.for(current_user: user, subject: Shift).scope.after(after).before(before)
    end
  end
end
