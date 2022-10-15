require "jwt"

module JsonWebToken
  extend ActiveSupport::Concern
  
  SECRET_KEY = Rails.application.secret_key_base

  def jwt_encode(payload, exp = 7.days.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    return unless token

    decoded = JWT.decode(token, SECRET_KEY)
    HashWithIndifferentAccess.new decoded[0] if decoded
  end

end