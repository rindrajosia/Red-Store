class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :product

  def self.list(user_id)
    Product.joins(:favorites).where(['favorites.user_id = ?', user_id])
  end
end
