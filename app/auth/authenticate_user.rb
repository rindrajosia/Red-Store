class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  def find_user
    { user_id: user.id, name: user.name, email: user.email, admin: user.admin, imageurl: user.imageurl } if user
  end

  private

  attr_reader :email, :password

  def user
    user = User.find_by(email: email)
    return user if user&.authenticate(password)

    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end
end
