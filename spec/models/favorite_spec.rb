require 'rails_helper'

RSpec.describe Favorite, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:favorite_products) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:priority) }
end
