class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id

      flash[:notice] = "Logged in successfully"
      redirect_to user
    else
      flash.now[:alert] = "there was something wrong with your login details" # flash.now without showing on redirect
      render 'new'
    end
  end

  def destroy
    flash[:notice] = "Logged out"
    session[:user_id] = nil
    redirect_to root_path
  end
end