# frozen_string_literal: true

module API
  module Users
    class CreationService
      class Ability
        attr_reader :current_user

        def initialize(current_user:)
          @current_user = current_user
        end

        def can_create?
          current_user.blank?
        end
      end
    end
  end
end
