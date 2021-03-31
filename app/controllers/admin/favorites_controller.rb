module Admin
  class FavoritesController < ApplicationController
    before_action :set_user_favorite, only: %i[destroy]
    before_action :set_favorite_product_list, only: %i[index]
    before_action :favorite_params_create, only: %i[create]

    def index
      json_response(@favorites)
    end

    def create
      @favorite_create = Favorite.create!(favorite_params_create)
      json_response(@favorite_create, :created)
    end

    def destroy
      @favorite.destroy
      head :no_content
    end

    private

    def set_favorite_product_list
      @favorites = Favorite.list(current_user.id)
    end

    def favorite_params_create
      params.permit(:user_id, :product_id)
    end

    def set_user_favorite
      @favorite = Favorite.find_by!(id: params[:id])
    end
  end
end
