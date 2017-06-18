Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'

      resources :users, only: [:create]
    end
  end
end
