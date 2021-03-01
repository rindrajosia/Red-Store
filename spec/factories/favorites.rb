FactoryBot.define do
  factory :favorite do
    user_id nil
    name { Faker::Name.name }
    priority { Faker::Number.number(1) }
  end
end
