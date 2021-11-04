Rails.application.routes.draw do
  resources :transactions
  resources :ledgers
  resources :users, only: [:index, :create, :update]

  post '/auth/login', to: 'authentications#login'
  get '/auth/verify', to: 'authentications#verify'

end
