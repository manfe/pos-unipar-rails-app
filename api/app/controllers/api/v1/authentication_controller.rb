class Api::V1::AuthenticationController < ApplicationController
  
  skip_before_action :authenticate_request

  # /api/v1/auth/login
  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = jwt_encode({ id: @user.id, name: @user.name, email: @user.email })
      render json: { token: token }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
