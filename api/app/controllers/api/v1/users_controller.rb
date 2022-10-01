class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users, include: [:articles]
  end

  # GET /users/1
  def show
    render json: @user, include: [:articles]
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, include: [:articles], status: :created, location: api_v1_user_url(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user, include: [:articles]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
