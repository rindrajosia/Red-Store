module Admin
  class FavoriteProductsController < ApplicationController
    before_action :set_favorite_product_list, only: %i[show]
    before_action :set_favorite_product, only: %i[update destroy]
    def index
      @favorite_product = FavoriteProduct.all_products_user(current_user.id)
      json_response(@favorite_product)
    end

    def show
      json_response(@favorites)
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

    def set_favorite_product_list
      @favorites = FavoriteProduct.list(current_user.id, params[:id])
    end

    def find_favorite_list
      params.permit(:favorite_id)
    end

    def set_products
      @products = Product.find(params[:product_id])
    end

    def set_favorite_product
      @favorite_product = FavoriteProduct.find(params[:id])
    end
  end
end
