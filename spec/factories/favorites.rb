FactoryBot.define do
  factory :favorite do
    user_id { Faker::Number.number(10) }
    name { Faker::Name.name }
    priority { Faker::Number.number(4) }
  end
end
