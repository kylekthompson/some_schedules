Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  namespace :api do
    namespace :v1 do
      post 'sign_in' => 'user_token#create'

      resources :companies, only: [:create]
      resources :users, only: [:show, :create]
    end
  end
end
