# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
description = 'In publishing and graphic design,
Lorem ipsum is a placeholder text commonly used
to demonstrate the visual form of a document or
a typeface without relying on meaningful content.
Lorem ipsum may be used as a placeholder before a final copy is available.'
User.create(name: 'Josia', email: 'rrindrajosia@gmail.com', password: '123456789', admin: true, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/c_scale,w_261/v1614634448/1589786907975_zncfed.jpg')
User.create(name: 'Marina', email: 'marina@gmail.com', password: 'marina', admin: false, imageurl: 'https://thumbs.dreamstime.com/b/default-avatar-thumb-6599242.jpg')

Category.create(name: 'Electronics')
Category.create(name: 'Fashion')
Category.create(name: 'Automotives')

Product.create(user_id: 1, category_id: 1, title: 'Sony Xperia Z3', description: description, imageurl: 'https://www.sony.com/image/dae23edc294287acc10c6b6125d5e2a3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF')
Product.create(user_id: 1, category_id: 1, title: 'HP Envy 15 LabTop', description: description, imageurl: 'https://store.hp.com/app/assets/images/product/8NB16UA%23ABA/center_facing.png?_=1573123913908&imwidth=270&imdensity=1')
Product.create(user_id: 1, category_id: 1, title: 'Samsung Smart Tv', description: description, imageurl: 'https://5.imimg.com/data5/LW/IP/AG/SELLER-47616313/40-smart-4k-ready-led-tv-500x500.jpeg')

Product.create(user_id: 1, category_id: 2, title: 'Fossil Men Stainless', description: description, imageurl: 'https://fossil.scene7.com/is/image/FossilPartners/FS4736_main?$sfcc_fos_large$')
Product.create(user_id: 1, category_id: 2, title: 'Lowa Men Renegade', description: description, imageurl: 'https://cdn.shopify.com/s/files/1/1220/0356/products/footwear-lowa-renegade-gtx-lo-men-s-1_grande.jpg?v=1579513322')
Product.create(user_id: 1, category_id: 2, title: 'Under Armour Sunglasses', description: description, imageurl: 'https://img.tennis-warehouse.com/watermark/rs.php?path=UACNSBLK-1.jpg&nw=600')

Product.create(user_id: 1, category_id: 3, title: 'Dodge: Ram 1500', description: description, imageurl: 'https://www.cstatic-images.com/car-pictures/xl/usc70rmt111c021001.png')
Product.create(user_id: 1, category_id: 3, title: 'Audi: A4 wagon', description: description, imageurl: 'https://media.ed.edmunds-media.com/audi/a4/2011/oem/2011_audi_a4_wagon_20t-avant-premium-quattro_fq_oem_2_500.jpg')
Product.create(user_id: 1, category_id: 3, title: 'Porsche 911990', description: description, imageurl: 'https://assets.dyler.com/uploads/cars/31836/1147878/medium_classic-porsche-911-996-carrera-coupe-1988-red-for-sale.webp')
