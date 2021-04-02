class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  def create
    user = User.create!(user_params)
    auth = AuthenticateUser.new(user.email, user.password)
    auth_token = auth.call
    user_new = auth.find_user
    response = { message: Message.account_created, auth_token: auth_token, user: user_new }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :password_confirmation,
      :admin,
      :imageurl
    )
  end
end
