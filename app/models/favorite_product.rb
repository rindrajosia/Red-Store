class FavoriteProduct < ApplicationRecord
  belongs_to :favorite
  belongs_to :product

  def self.all_products_user(user_id)
    Product.joins(:favorites).where(['favorites.user_id = ?', user_id])
  end

  def self.list(user_id, favorite_id)
    Product.joins(:favorites).where!(['favorites.user_id = ? and favorites.id = ?', user_id, favorite_id])
  end
end
