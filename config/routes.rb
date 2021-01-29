Rails.application.routes.draw do
  root "home#index"
  resources :tasks, only: [:index, :create, :show]

  get '*path', to: 'home#index', via: :all
end
