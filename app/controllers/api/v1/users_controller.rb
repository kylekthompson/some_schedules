module Api
  module V1
    class UsersController < Api::ApplicationController
      skip_before_action :authenticate_user, only: :create

      def create
        @user = User.new(create_params)

        if @user.save
          render :create, status: :created
        else
          render :errors, status: :unprocessable_entity
        end
      end

      private

      def create_params
        params.require(:user).permit(
          :first_name,
          :last_name,
          :email,
          :password,
          :password_confirmation
        )
      end
    end
  end
end
