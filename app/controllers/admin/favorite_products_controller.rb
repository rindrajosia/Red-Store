module Admin
  class FavoriteProductsController < ApplicationController
    before_action :set_favorites, only: %i[show]
    before_action :set_favorite_product_list, only: %i[show]
    before_action :set_favorite_product, only: %i[update destroy]
    def index
      @favorite_product = Favorite.list_products(current_user.id)
      json_response(@favorite_product)
    end

    def show
      json_response(@favorite_products)
    end

    def create
      @favorite_product = FavoriteProduct.create!(favorite_product_params_create)
      json_response(@favorite_product, :created)
    end

    def update
      @favorite_product.update(favorite_product_params_create)
      head :no_content
    end

    def destroy
      @favorite_product.destroy
      head :no_content
    end

    private

    def favorite_product_params_create
      params.permit(:favorite_id, :product_id)
    end

    def set_favorites
      @favorites = Favorite.find(params[:favorite_id])
    end

    def set_products
      @products = Product.find(params[:product_id])
    end

    def set_favorite_product
      @favorite_product = FavoriteProduct.find(params[:id])
    end

    def set_favorite_product_list
      @favorite_products = @favorites.favorite_products.find_by!(id: params[:id]) if @favorites
    end
  end
end
