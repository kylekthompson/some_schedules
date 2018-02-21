Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/graphql'
  end

  namespace :api do
    post 'graphql', to: 'graphql#execute'

    resources :authentication, only: [] do
      collection do
        get :context
        post :sign_in
        post :sign_out
        post :sign_up
      end
    end
  end
end
