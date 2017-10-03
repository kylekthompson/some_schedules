Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/v1/graphql'
  end

  namespace :api do
    namespace :v1 do
      post 'graphql', to: 'graphql#execute'
    end
  end
end
