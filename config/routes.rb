Mblg::Application.routes.draw do
  root 'main#index'
  get '/test', to: 'main#test'

  resources :posts
  resources :movies, only: [:index]
end
