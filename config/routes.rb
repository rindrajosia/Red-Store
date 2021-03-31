Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  scope module: 'admin', path: 'admin', constraints: ApiVersion.new('admin', true) do

    resources :favorites, only: [:destroy, :create, :index]
    resources :categories
    resources :products, only: [:show, :destroy, :index, :create, :update]

  end

  scope module: 'front', path: 'front', constraints: ApiVersion.new('front', true) do

    resources :favorites, only: [:destroy, :create, :index]
    resources :categories, only: [:index, :show]
    resources :products, only: [:index, :show]

  end


end
