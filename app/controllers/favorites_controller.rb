class FavoritesController < ApplicationController
  before_action :set_user
  before_action :set_user_favorite, only: %i[show update destroy]

  def index
    json_response(@user.favorites)
  end

  def show
    json_response(@favorite)
  end

  def create
    @favorite_create = @user.favorites.create!(favorite_params)
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

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_user_favorite
    @favorite = @user.favorites.find_by!(id: params[:id]) if @user
  end
end
