FactoryBot.define do
  factory :product do
    user_id { Faker::Number.number(10) }
    category_id { Faker::Number.number(10) }
    title { Faker::Lorem.word }
    description { Faker::Lorem.word }
    imageurl 'https://raw.githubusercontent.com/rindrajosia/back_end/feature/docs/erd_final.png'
  end
end
