class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show update destroy ]

  # GET /articles
  def index
    @articles = Article.all

    render json: @articles, include: [:category, :author]
  end

  # GET /articles/1
  def show
    render json: @article, include: [:category, :author]
  end

  # POST /articles
  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, include: [:category, :author], status: :created, location: api_v1_article_url(@article)
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article, include: [:category, :author]
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def destroy
    @article.destroy
  end

  # GET /articles/published
  def published
    @articles = Article.published

    render json: @articles, include: [:category, :author]
  end

  # GET /articles/published
  def not_published
    @articles = Article.not_published

    render json: @articles, include: [:category, :author]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.require(:article).permit(:title, :body, :published_at, :category_id, :author_id)
    end
end
