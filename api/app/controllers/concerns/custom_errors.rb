module CustomErrors
  extend ActiveSupport::Concern

  included do
    RESCUABLE_EXCEPTIONS.each do |name, error_code|
      rescue_from name, with: error_code
    end
  end

  def unauthorized
    render json: {code: 401, message: 'não autorizado'}, status: :unauthorized
  end
  

  def not_found
    render json: {code: 404, message: 'objeto não encontrado'}, status: :not_found
  end

  RESCUABLE_EXCEPTIONS = {
    'JWT::ExpiredSignature' => :unauthorized,
    'JWT::DecodeError' => :unauthorized,
    'CustomErrors::Unauthorized' => :unauthorized,
    'ActiveRecord::RecordNotUnique' => :unprocessable_entity,
    'ActiveRecord::RecordNotFound' => :not_found
  }.freeze

end