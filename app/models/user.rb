class User < ApplicationRecord
  has_secure_password
  has_many :products, dependent: :destroy
  has_many :favorites, dependent: :destroy
  validates_presence_of :name, :email, :password_digest, :imageurl
  validates :name, length: { maximum: 50 }
  validates :email, uniqueness: { case_sensitive: false }, email: true
  validates :password_digest, length: { minimum: 4 }
end
