class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?, :is_admin?

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # memoization - only fetch from db if not already set
  end

  def logged_in?
    !!current_user # !! turns into boolean
  end

  def require_user
    if !logged_in?
      flash[:alert] = "You must be logged in to perform that action"
      redirect_to login_path
    end
  end

  def is_admin?
    logged_in? && current_user.admin == true
  end
end
