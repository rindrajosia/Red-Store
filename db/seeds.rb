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
User.create(name: 'Josia', email: 'rrindrajosia@gmail.com', password: '123456789', admin: true, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1615836208/bfdfg499x4eyzeufnd1m.jpg')
User.create(name: 'Marina', email: 'marina@gmail.com', password: 'marina', admin: false, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1616802722/xt14bzu6fcir16pf3cxm.png')

Category.create(name: 'Electronics')
Category.create(name: 'Fashion')
Category.create(name: 'Automotives')

Product.create(user_id: 1, category_id: 1, title: 'Sony Xperia Z3', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031513/o2yfcbgiqioa851igmev.jpg')
Product.create(user_id: 1, category_id: 1, title: 'HP Envy 15 LabTop', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031462/oswbazievwayamjl5gjo.jpg')
Product.create(user_id: 1, category_id: 1, title: 'Samsung Smart Tv', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031392/opmqgqonnmziosg12xff.jpg')
Product.create(user_id: 1, category_id: 1, title: 'Philips Smart Tv', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031768/rgnmpxh3zj4nxcrupkkx.webp')

Product.create(user_id: 1, category_id: 2, title: 'Fossil Men Stainless', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617030754/w3pzrwu2krtewiwuxavl.jpg')
Product.create(user_id: 1, category_id: 2, title: 'Lowa Men Renegade', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617030726/evdez7bzpp6l2dpt8ary.jpg')
Product.create(user_id: 1, category_id: 2, title: 'Under Armour Sunglasses', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617030692/thrplfpgllbmjwbbr4zn.jpg')
Product.create(user_id: 1, category_id: 2, title: 'Fossil Woman Sunglasses', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617030653/tly65snicbapodtrnpdh.jpg')

Product.create(user_id: 1, category_id: 3, title: 'Dodge: Ram 1500', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031106/u6qdiatvejtfalnegl77.jpg')
Product.create(user_id: 1, category_id: 3, title: 'Audi: A4 wagon', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031212/qcpfesajwqzrbbbiaex5.jpg')
Product.create(user_id: 1, category_id: 3, title: 'Porsche 911990', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031159/xa9tnzfdewnwwwh7safg.jpg')
Product.create(user_id: 1, category_id: 3, title: 'Porsche wagon', description: description, imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1617031310/nx9xrzym2f4zd44funil.jpg')
