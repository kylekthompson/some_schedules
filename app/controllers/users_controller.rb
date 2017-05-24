class UsersController < ApplicationController
  def create
    @user = User.new(create_params)

    if @user.save
      render :create, status: :created
    else
      render json: { errors: @user.errors }, status: :conflict
    end
  end

  private

  def create_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
