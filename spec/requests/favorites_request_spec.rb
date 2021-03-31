require 'rails_helper'

RSpec.describe 'Favorites', type: :request do
  let!(:user) { create(:user, admin: true) }
  let!(:category) { create(:category) }
  let!(:products) { create_list(:product, 20, category_id: category.id, user_id: user.id) }
  let(:product_id) { products.first.id }
  let(:product_id_last) { products.last.id }
  let!(:favorites) { create_list(:favorite, 2, user_id: user.id, product_id: product_id) }
  let(:favorite_id) { favorites.first.id }
  let(:headers) { valid_headers }

  describe 'GET /admin/favorites' do
    before { get '/admin/favorites', params: {}, headers: headers }

    context 'when user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all products in one user favorite' do
        expect(json.size).to eq(2)
      end
    end
  end

  describe 'POST /admin/favorites' do
    let(:valid_attributes) { { user_id: user.id, product_id: product_id_last }.to_json }

    context 'when request attributes are valid' do
      before { post '/admin/favorites', params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      let(:invalid_attributes) { { user_id: nil, product_id: nil }.to_json }
      before { post '/admin/favorites', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed/)
      end
    end
  end

  describe 'DELETE /admin/favorites/:product_id' do
    before { delete "/admin/favorites/#{product_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      puts product_id
      expect(response).to have_http_status(204)
    end
  end
end
