Mblg::Application.routes.draw do
  root 'main#index'

  resources :posts, only: [:index]
  resources :movies, only: [:index]
end
