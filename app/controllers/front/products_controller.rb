module Front
  class ProductsController < ApplicationController
    skip_before_action :authorize_request, only: %i[index show]
    before_action :set_product, only: %i[show]

    def index
      @products = Product.all
      json_response(@products)
    end

    def show
      json_response(@product)
    end

    private

    def set_product
      @product = Product.find(params[:id])
    end
  end
end
