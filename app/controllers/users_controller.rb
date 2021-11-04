class UsersController < ApplicationController
  before_action :user_params, only: :create
  before_action :user_update_params, only: :update
  
   # GET /users
  def index
    @users = User.pluck(:id, :username)

    render json: @users
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      @token = encode({ id: @user.id })
      render json: {
        user: @user.attributes.except('password_digest'),
        token: @token
      }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

    # PATCH/PUT /users/1
    def update
      @user = User.find(params[:id])
      if @user.update_attribute(:balance, params[:balance])
        render json: @user.attributes.except('password_digest','email')
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
  private

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def user_update_params
    params.permit(:username, :balance)
  end
end
