class Api::V2::ArticlesController < Api::V1::ArticlesController

  # Overrides V1#published
  # GET /articles/published
  def published
    render json: "overriding#v1"
  end

end
