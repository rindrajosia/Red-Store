class Product < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :favorite_products, dependent: :destroy
  has_many :favorites, through: :favorite_products
  validates_presence_of :title, :description, :user_id, :imageurl
end
