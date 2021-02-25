class ProductsController < ApplicationController
  before_action :set_category, only: %i[index create update destroy]
  before_action :set_product, only: [:show]
  before_action :set_user, only: %i[create update destroy]
  before_action :set_category_product, only: %i[update destroy]

  def index
    json_response(@category.products)
  end

  def show
    json_response(@product)
  end

  def create
    @product_create = Product.create!(product_params_create)
    json_response(@product_create, :created)
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
    params.permit(:title, :description, :imageurl, :user_id, :category_id) if @category && @user
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_user
    @user = User.user_admin(params[:user_id])
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def set_category_product
    @product = @category.products.find_by!(id: params[:id]) if @category && @user
  end
end
