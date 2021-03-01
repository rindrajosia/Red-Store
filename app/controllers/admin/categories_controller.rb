module Admin
  class CategoriesController < ApplicationController
    skip_before_action :authorize_request, only: %i[index show]
    before_action :set_category, only: %i[show update destroy]
    before_action :set_user, only: %i[create update destroy]

    def index
      @categories = Category.all
      json_response(@categories)
    end

    def create
      @category = Category.create!(category_params)
      json_response(@category, :created)
    end

    def show
      json_response(@category)
    end

    def update
      @category.update(category_params)
      head :no_content
    end

    def destroy
      @category.destroy
      head :no_content
    end

    private

    def category_params
      params.permit(:name) if @user
    end

    def set_user
      @user = current_user if current_user.admin
    end

    def set_category
      @category = Category.find(params[:id])
    end
  end
end
