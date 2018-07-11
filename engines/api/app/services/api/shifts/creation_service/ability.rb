# frozen_string_literal: true

module API
  module Shifts
    class CreationService
      class Ability
        attr_reader :current_user

        def initialize(current_user:)
          @current_user = current_user
        end

        def can_create?(user:, **_ignored)
          current_user.managerial? && current_user.company == user.company
        end
      end
    end
  end
end
