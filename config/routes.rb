Rails.application.routes.draw do
  root "home#index"
  resources :tasks, except: [:new, :edit]

  get '*path', to: 'home#index', via: :all
end
