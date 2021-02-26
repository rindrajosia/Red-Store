module User
  class CategoriesController < ApplicationController
    before_action :set_category, only: %i[show]
    skip_before_action :authorize_request, only: %i[index show]

    def index
      @categories = Category.all
      json_response(@categories)
    end

    def show
      json_response(@category)
    end

    private

    def category_params
      params.permit(:name)
    end

    def set_category
      @category = Category.find(params[:id])
    end
  end
end
