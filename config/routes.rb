Mblg::Application.routes.draw do
  root 'main#index'
  get '/test', to: 'main#test'

  resources :posts, only: [:index]
  resources :movies, only: [:index]
end
