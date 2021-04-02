class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.boolean :admin, default: false
      t.string :password_digest
      t.string :imageurl, default: 'https://res.cloudinary.com/rindrajosia/image/upload/v1616802722/xt14bzu6fcir16pf3cxm.png'

      t.timestamps
    end
  end
end
