FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email 'foo@bar.com'
    password 'foobar'
    admin true
    imageurl 'https://raw.githubusercontent.com/rindrajosia/back_end/feature/docs/erd_final.png'
  end
end
