Rails.application.routes.draw do
  root "home#index"
  resources :tasks, except: [:new, :edit]
  resources :users, only: [:create, :index]
  resource :sessions, only: [:create, :destroy]
  resources :comments, only: :create

  get '*path', to: 'home#index', via: :all
end
