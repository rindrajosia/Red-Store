Rails.application.routes.draw do
  resources :categories, except: [:index, :show, :create, :update, :destroy] do
    resources :users, except: [:index, :show, :create, :update, :destroy] do
      resources :products, only: [:create, :update, :destroy]
    end
  end
  resources :categories do
    resources :products, only: [:index, :show]
  end
  resources :users do
    resources :favorites
  end

end
