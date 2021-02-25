Rails.application.routes.draw do
  resources :products, only: [:show]
  resources :categories, except: [:index, :show, :create, :update, :destroy] do
    resources :users, except: [:index, :show, :create, :update, :destroy] do
      resources :products, only: [:create, :update, :destroy]
    end
  end
  resources :categories  do
    resources :products, only: [:index]
  end

  resources :users do
    resources :favorites
  end
  resources :favorites, except: [:index, :show, :create, :update, :destroy] do
    resources :products, except: [:index, :show, :create, :update, :destroy] do
      resources :favorite_products, only: [:create]
    end
  end
  resources :favorite_products, only: [:destroy]

  resources :favorites, except: [:index, :show, :create, :update, :destroy] do
    resources :favorite_products, only: [:index, :show]
  end


end
