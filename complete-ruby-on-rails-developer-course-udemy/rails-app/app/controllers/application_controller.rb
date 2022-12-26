class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # memoization - only fetch from db if not already set
  end

  def logged_in?
    !!current_user # !! turns into boolean
  end
end
