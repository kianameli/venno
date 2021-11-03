class UsersController < ApplicationController
  before_action :user_params
  # POST /users
    def create
      @user = User.new(user_params)
  
      if @user.save
        Account.create!(user_id: @user.id, balance: 0.00)
        @token = encode({ id: @user.id })
        render json: {
          user: @user.attributes.except('password_digest'),
          token: @token
        }, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    private
  
      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:username, :email, :password)
      end
end
