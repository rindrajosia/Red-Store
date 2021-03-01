FactoryBot.define do
  factory :product do
    user_id nil
    category_id nil
    title { Faker::Lorem.paragraph(9) }
    description { Faker::Lorem.paragraph(9) }
    imageurl 'https://raw.githubusercontent.com/rindrajosia/back_end/feature/docs/erd_final.png'
  end
end
