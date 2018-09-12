# frozen_string_literal: true

module API
  class MesController < API::ApplicationController
    skip_before_action :authenticate_user!, only: %i[show]

    def show
      respond_with(current_user || { me: nil }, root: :me)
    end
  end
end
