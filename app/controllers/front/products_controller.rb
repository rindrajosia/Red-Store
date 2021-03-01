module Front
  class ProductsController < ApplicationController
    skip_before_action :authorize_request, only: %i[index show]
    before_action :set_category, only: %i[index]
    before_action :set_product, only: %i[show]

    def index
      json_response(@category.products)
    end

    def show
      json_response(@product)
    end

    private

    def set_category
      @category = Category.find(params[:category_id])
    end

    def set_product
      @product = Product.find(params[:id])
    end

    def set_category_product
      @product = @category.products.find_by!(id: params[:id])
    end
  end
end
