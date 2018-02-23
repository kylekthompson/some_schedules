# frozen_string_literal: true

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/graphql' if Rails.env.development?

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

    resources :invitations, only: [] do
      collection do
        post :invite
      end
    end

    resources :schedules, only: [] do
      collection do
        get :context
      end
    end

    resources :users, only: [] do
      resources :shifts, only: :create
    end
  end
end
