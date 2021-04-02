class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.belongs_to :product, index: true
      t.belongs_to :user, index: true
    end
  end
end
