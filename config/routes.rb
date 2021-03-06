Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  scope module: 'admin', path: 'admin', constraints: ApiVersion.new('admin', true) do
    resources :products, only: [:show, :destroy]

    resources :categories, except: [:index, :show, :create, :update, :destroy] do
      resources :products, only: [:create, :update]
    end

    resources :favorites
    resources :categories
    resources :products, only: [:index]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :products, except: [:index, :show, :create, :update, :destroy] do
        resources :favorite_products, only: [:create, :update]
      end
    end
    resources :favorite_products, only: [:destroy]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :favorite_products, only: [:index, :show]
    end
  end

  scope module: 'front', path: 'front', constraints: ApiVersion.new('front', true) do
    resources :products, only: [:show]

    resources :categories, except: [:index, :show, :create, :update, :destroy] do
      resources :products, only: [:show]
    end

    resources :favorites
    resources :categories, only: [:index, :show]
    resources :products, only: [:index]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :products, except: [:index, :show, :create, :update, :destroy] do
        resources :favorite_products, only: [:create, :update]
      end
    end
    resources :favorite_products, only: [:destroy]

    resources :favorites, except: [:index, :show, :create, :update, :destroy] do
      resources :favorite_products, only: [:index, :show]
    end
  end


end
