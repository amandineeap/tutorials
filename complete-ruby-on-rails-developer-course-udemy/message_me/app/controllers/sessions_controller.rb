class SessionsController < ApplicationController
  before_action :logged_in_redirect, only: [:new, :create]

  def new
  end

  def create
    user = User.find_by(username: params[:session][:username])

    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id

      flash[:notice] = "Logged in successfully"
      redirect_to root_path
    else
      flash.now[:alert] = "there was something wrong with your login details" # flash.now without showing on redirect
      render 'new'
    end
  end

  private
  def logged_in_redirect
    if logged_in?
      flash[:error] = "you are already logged in"
      redirect_to root_path
    end
  end

end