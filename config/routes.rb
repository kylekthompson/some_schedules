Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'sign_in' => 'user_token#create'

      resources :companies, only: [:create]
      resources :users, only: [:show, :create]
    end
  end
end
