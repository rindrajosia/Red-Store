class User < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :favorites, dependent: :destroy
  validates_presence_of :name, :email, :password_digest, :imageurl

  def self.user_admin(user_id)
    User.where({ id: user_id, admin: true }).first
  end
end
