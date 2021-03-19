require 'rails_helper'
# rubocop:disable Layout/LineLength
RSpec.describe 'FavoriteProducts' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }
  let!(:favorite) { create(:favorite, user_id: user.id) }
  let!(:product) { create(:product, category_id: category.id, user_id: user.id) }
  let!(:favorite_product) { create(:favorite_product, product_id: product.id, favorite_id: favorite.id) }
  let(:favorite_id) { favorite.id }
  let(:favorite_product_id) { favorite_product.id }
  let(:product_id) { product.id }
  let(:headers) { valid_headers }

  describe 'GET /admin/favorite_products' do
    before { get '/admin/favorite_products', params: {}, headers: headers }

    context 'when favorite_products exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
      it 'returns all favorites products' do
        expect(json.size).to eq(1)
      end
    end
  end

  describe 'GET /admin/favorite_products/:id' do
    before { get "/admin/favorite_products/#{favorite_id}", params: {}, headers: headers }

    context 'when favorites favorite_products exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when user favorite_products does not exist' do
      let(:favorite_id) { 0 }

      it 'returns a an empty braket' do
        expect(response.body).to eq('[]')
      end
    end
  end

  describe 'POST /admin/favorite_products' do
    let(:valid_attributes) { { product_id: product_id, favorite_id: favorite_id }.to_json }

    context 'when request attributes are valid' do
      before { post '/admin/favorite_products', params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      let(:invalid_attributes) { { product_id: nil, favorite_id: nil }.to_json }
      before { post '/admin/favorite_products', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Favorite must exist, Product must exist/)
      end
    end
  end

  describe 'PUT /admin/favorites/:favorite_id/products/:product_id/favorite_products/:id' do
    let(:valid_attributes) { { product_id: product_id, favorite_id: favorite_id } }

    before { put "/admin/favorites/#{favorite_id}/products/#{product_id}/favorite_products/#{favorite_product_id}", params: {}, headers: headers }

    context 'when product exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the product does not exist' do
      let(:favorite_product_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find FavoriteProduct/)
      end
    end
  end

  describe 'DELETE /admin/favorite_products/:id' do
    before { delete "/admin/favorite_products/#{favorite_product_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
# rubocop:enable  Layout/LineLength
