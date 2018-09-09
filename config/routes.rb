# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :authentication do
      resource :sign_in, only: :create
      resource :sign_out, only: :create
    end

    namespace :contexts do
      resource :schedule, only: :show
    end

    resources :companies, only: :create
    resources :invitations, only: :create
    resource :me, only: :show

    resources :users, only: :create do
      resources :shifts, only: :create
    end
  end
end
