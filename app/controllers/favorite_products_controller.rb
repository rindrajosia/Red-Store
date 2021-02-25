class FavoriteProductsController < ApplicationController
  before_action :set_products

  def show
    json_response(@products.first.product)
  end

  private

  def set_products
    @products = Favorite.find(params[:favorite_id]).favorite_products.includes(:product)
  end
end
