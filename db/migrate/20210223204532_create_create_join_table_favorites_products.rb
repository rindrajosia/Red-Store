class CreateCreateJoinTableFavoritesProducts < ActiveRecord::Migration[6.1]
  def change
      create_table :favorite_products do |t|
      t.belongs_to :product, index: true
      t.belongs_to :favorite, index: true
    end
  end
end
