# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: 'Josia', email: 'rrindrajosia@gmail.com', password: '123456789', admin: true, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/c_scale,w_261/v1614634448/1589786907975_zncfed.jpg')
User.create(name: 'Marina', email: 'marina@gmail.com', password: 'marina', admin: false, imageurl: 'https://thumbs.dreamstime.com/b/default-avatar-thumb-6599242.jpg')

Category.create(name: 'Electronics')
Category.create(name: 'Fashion')
Category.create(name: 'Automotives')

Product.create(user_id: 1, category_id: 1, title: 'Sony Xperia Z3', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 1, title: 'HP Envy 15 LabTop', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 1, title: 'Samsung Smart Tv', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)

Product.create(user_id: 1, category_id: 2, title: 'Fossil Men Stainless', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 2, title: 'Lowa Men Renegade', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 2, title: 'Under Armour Sunglasses', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)

Product.create(user_id: 1, category_id: 3, title: 'Dodge: Ram 1500', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 3, title: 'Audi: A4 wagon', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
Product.create(user_id: 1, category_id: 3, title: 'Porsche 911990', description: Faker::Lorem.paragraph(9), imageurl: Faker::LoremFlickr.image)
