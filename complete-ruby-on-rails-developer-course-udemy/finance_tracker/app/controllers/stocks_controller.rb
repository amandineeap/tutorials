class StocksController < ApplicationController
  def search
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock])
      if @stock
      #   respond_to do |format|
      #     format.js { render partial: 'users/result' }
      #   end
      # Update to use rails turbo frame to render the result here?
        render 'users/my_portfolio'
      else
        flash[:alert] = "Stock not found"
        render 'users/my_portfolio'
      end
    else
      flash[:alert] = "Please enter a symbol to search"
      redirect_to my_portfolio_path
    end
  end
end
