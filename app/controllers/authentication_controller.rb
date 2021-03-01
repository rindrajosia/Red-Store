class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  def authenticate
    auth = AuthenticateUser.new(auth_params[:email], auth_params[:password])
    auth_token = auth.call
    user = auth.find_user
    json_response(auth_token: auth_token, message: Message.login_success, user: user)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
