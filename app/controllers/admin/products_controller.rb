module Admin
  class ProductsController < ApplicationController
    skip_before_action :authorize_request, only: %i[index show]
    before_action :set_product, only: %i[show destroy update]
    before_action :set_user, only: %i[create update destroy]

    def index
      @products = Product.all
      json_response(@products)
    end

    def show
      json_response(@product)
    end

    def create
      @product_create = Product.create!(product_params_create)
      json_response(@product_create.save, :created)
    end

    def update
      @product.update(product_params_create)
      head :no_content
    end

    def destroy
      @product.destroy
      head :no_content
    end

    private

    def product_params_create
      user = { user_id: @user.id }
      @params = params.permit(:title, :description, :imageurl, :category_id) if @user
      @params.merge(user)
    end

    def set_user
      @user = current_user if current_user.admin
    end

    def set_product
      @product = Product.find(params[:id])
    end
  end
end
