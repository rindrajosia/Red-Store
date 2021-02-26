module User
  class FavoritesController < ApplicationController
    before_action :set_user_favorite, only: %i[show update destroy]

    def index
      @favorites = current_user.favorites
      json_response(@favorites)
    end

    def show
      json_response(@favorite)
    end

    def create
      @favorite_create = current_user.favorites.create!(favorite_params)
      json_response(@favorite_create, :created)
    end

    def update
      @favorite.update(favorite_params)
      head :no_content
    end

    def destroy
      @favorite.destroy
      head :no_content
    end

    private

    def favorite_params
      params.permit(:name, :priority)
    end

    def set_user_favorite
      @favorite = current_user.favorites.find_by!(id: params[:id])
    end
  end
end
