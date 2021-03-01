class FavoriteProduct < ApplicationRecord
  belongs_to :favorite
  belongs_to :product
end
