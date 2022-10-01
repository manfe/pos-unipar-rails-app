Rails.application.routes.draw do
  
  
  namespace :api do
    namespace :v1 do
      # Auth
      post 'auth/login', to: "authentication#login"

      # Users
      resources :users

      # Categories
      resources :categories
      
      # Articles
      get "/articles/published", to: "articles#published"
      get "/articles/not_published", to: "articles#not_published"
      resources :articles
    end

    namespace :v2 do
      # Users
      resources :users

      # Categories
      resources :categories
      
      # Articles
      get "/articles/published", to: "articles#published"
      get "/articles/not_published", to: "articles#not_published"
      resources :articles
    end
  end  
end
