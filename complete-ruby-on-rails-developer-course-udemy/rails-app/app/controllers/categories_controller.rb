class CategoriesController < ApplicationController
  before_action :require_admin, except: [:index, :show]

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      flash[:notice] = "Category was created successfully"
      redirect_to @category
    else
      render "new"
    end
  end
  
  def index
    @categories = Category.paginate(page: params[:page], per_page: 2)
  end

  def show
    @category = Category.find(params[:id])
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      flash[:notice] = "category updated successfully"
      redirect_to @category
    else
      render 'edit'
    end
  end

  private
  def category_params
    params.require(:category).permit(:name)
  end

  def require_admin
    if !(logged_in? && current_user.admin?)
      flash[:alert] = "you must be logged in as an admin"
      redirect_to categories_path
    end
  end
end