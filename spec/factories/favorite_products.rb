FactoryBot.define do
  factory :favorite_product do
    product_id { Faker::Number.number(10) }
    favorite_id { Faker::Number.number(4) }
  end
end
