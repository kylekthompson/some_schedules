# frozen_string_literal: true

module Users
  class Finder
    attr_reader :user_id

    def initialize(params:)
      @user_id = params[:id]
    end

    def find_by_id
      user = User.find(user_id)
      APIResponse.new(status: :ok, value: user)
    rescue ActiveRecord::RecordNotFound
      APIResponse.new(status: :not_found, errors: { '': ["User #{user_id} was not found"] })
    end
  end
end
