# frozen_string_literal: true

module API
  module Companies
    class CreationService
      class Ability
        attr_reader :current_user

        def initialize(current_user:)
          @current_user = current_user
        end

        def can_create?
          current_user.company.blank? && current_user.owner?
        end
      end
    end
  end
end
