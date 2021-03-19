Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  scope module: 'admin', path: 'admin', constraints: ApiVersion.new('admin', true) do

    resources :favorites
    resources :categories
    resources :products, only: [:show, :destroy, :index, :create, :update]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :products, except: [:index, :show, :create, :update, :destroy] do
        resources :favorite_products, only: [:update]
      end
    end
    resources :favorite_products, only: [:destroy, :create, :index, :show]

  end

  scope module: 'front', path: 'front', constraints: ApiVersion.new('front', true) do

    resources :favorites
    resources :categories, only: [:index, :show]
    resources :products, only: [:index, :show]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :products, except: [:index, :show, :create, :update, :destroy] do
        resources :favorite_products, only: [:update]
      end
    end
    resources :favorite_products, only: [:destroy, :create, :index, :show]

  end


end
