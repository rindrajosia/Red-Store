require 'rails_helper'

RSpec.describe Product, type: :model do
  it { should belong_to(:category) }
  it { should belong_to(:user) }
  it { should have_many(:favorites).dependent(:destroy) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:imageurl) }
end
