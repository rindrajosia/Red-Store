class Favorite < ApplicationRecord
  belongs_to :user
  has_many :favorite_products, dependent: :destroy
  has_many :products, through: :favorite_products
  validates_presence_of :name, :priority
  validates :name, length: { minimum: 2, maximum: 50 }

  def self.all_favorites_products(user_id)
    Favorite.find_by(user_id: user_id).products.includes(:favorite_products)
  end

  def self.list(user_id)
    Favorite.find_by(user_id: user_id).products
  end
end
