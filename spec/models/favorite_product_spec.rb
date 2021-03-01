require 'rails_helper'

RSpec.describe FavoriteProduct, type: :model do
  it { should belong_to(:favorite) }
  it { should belong_to(:product) }
end
