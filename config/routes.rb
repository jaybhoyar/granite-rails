Rails.application.routes.draw do
  resources :articles
  root to: "home#welcome"
  get "/articles" => "articles#list"
  resource :profile
  resources :books
end
