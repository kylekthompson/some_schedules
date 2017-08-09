module Users
  class Creator
    attr_reader :user_attributes

    def initialize(params:)
      @user_attributes = params.require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation
      )
    end

    def create
      user = User.new(user_attributes)

      if user.save
        APIResponse.new(status: :created, value: user)
      else
        APIResponse.new(status: :unprocessable_entity, errors: user.errors.messages)
      end
    end
  end
end
