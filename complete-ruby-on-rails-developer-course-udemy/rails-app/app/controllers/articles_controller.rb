class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new()
  end

  def create
    # render plain: params[:article] # need data: { turbo: false } on form_with to work
    @article = Article.new(params.require(:article).permit(:title, :description))
    # render plain: @article.inspect # need data: { turbo: false } on form_with to work
    if @article.save
      flash[:notice] = "Article was created successfully"
      redirect_to @article # article_path(@article)
    else
      flash[:notice] = @article.errors.full_messages
      render 'new', status: 422
    end
  end
end
