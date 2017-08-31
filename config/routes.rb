Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/v1/graphql'
  end

  namespace :api do
    namespace :v1 do
      post 'graphql', to: 'graphql#execute'
      post 'sign_in', to: 'user_token#create'

      resources :companies, only: [:create]
      resources :users, only: [:show, :create]
    end
  end
end
