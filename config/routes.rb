Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'sign_in' => 'user_token#create'

      resources :users, only: [:create]
    end
  end
end
