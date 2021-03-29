FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { 'foobar' }
    admin { true }
    imageurl { Faker::Company.logo }
  end
end
