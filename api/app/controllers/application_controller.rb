class ApplicationController < ActionController::API
  include JsonWebToken
  include CustomErrors

  before_action :authenticate_request

  private
  
  def authenticate_request
    authorization_string = request.headers["Authorization"]

    token = authorization_string.split(" ").last if authorization_string

    decoded = jwt_decode(token)
    
    @current_user = User.find(decoded[:id])
  end
end
