class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :require_user, except: [:index, :show]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def index
    @articles = Article.paginate(page: params[:page], per_page: 2)
    # Article.all
  end

  def show
  end

  def new
    @article = Article.new()
  end

  def edit
  end

  def create
    # render plain: params[:article] # need data: { turbo: false } on form_with to work
    @article = Article.new(article_params)
    @article.user = current_user
    # render plain: @article.inspect # need data: { turbo: false } on form_with to work
    if @article.save
      flash[:notice] = "Article was created successfully"
      redirect_to @article # article_path(@article)
    else
      render 'new', status: 422
    end
  end

  def update
    if @article.update(article_params)
      flash[:notice] = "Article was updated successfully"
      redirect_to @article
    else 
      render 'edit'
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_path
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
  end

  def require_same_user
    if current_user != @article.user
      flash[:alert] = "you can only edit or delete your own article"
      redirect_to @article
    end
  end
end
