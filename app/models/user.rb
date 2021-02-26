class User < ApplicationRecord
  has_secure_password
  has_many :products, dependent: :destroy
  has_many :favorites, dependent: :destroy
  validates_presence_of :name, :email, :password_digest, :imageurl
end
