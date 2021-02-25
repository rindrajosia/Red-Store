require 'rails_helper'

RSpec.describe 'FavoriteProducts' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:favorite) { create(:favorite, user_id: user.id) }
  let!(:product) { create(:product, category_id: category.id, user_id: user.id) }
  let!(:favorite_product) { create_list(:favorite_product, 20, product_id: product.id, favorite_id: favorite.id) }
  let(:favorite_id) { favorite.id }
  let(:favorite_product_id) { favorite_product.first.id }

  describe 'GET /favorites/:favorite_id/favorite_products/:id' do
    before { get "/favorites/#{favorite_id}/favorite_products/#{favorite_product_id}" }

    context 'when favorites favorite_products exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the item' do
        expect(json['id']).to eq(favorite_id)
      end
    end
  end
end
