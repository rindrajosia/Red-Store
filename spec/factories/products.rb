FactoryBot.define do
  factory :product do
    title { Faker::Lorem.paragraph(9) }
    description { Faker::Lorem.paragraph(9) }
    imageurl { "https://raw.githubusercontent.com/rindrajosia/back_end/feature/docs/erd_final.png" }
    user_id {}
    category_id {}
  end
end
