require 'rails_helper'

RSpec.describe 'Favorites', type: :request do
  let!(:user) { create(:user) }
  let!(:favorites) { create_list(:favorite, 20, user_id: user.id) }
  let(:user_id) { user.id }
  let(:id) { favorites.first.id }
  let(:headers) { valid_headers }

  describe 'GET /admin/favorites' do
    before { get '/admin/favorites', params: {}, headers: headers }

    context 'when user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all favorites products' do
        expect(json.size).to eq(20)
      end
    end
  end

  describe 'GET /admin/favorites/:id' do
    before { get "/admin/favorites/#{id}", params: {}, headers: headers }

    context 'when user favorite exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the favorite' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when user favorite does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Favorite/)
      end
    end
  end

  describe 'POST /admin/favorites' do
    let(:valid_attributes) { { name: 'Visit Narnia', priority: 1 }.to_json }

    context 'when request attributes are valid' do
      before { post '/admin/favorites', params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      let(:invalid_attributes) { { name: nil, priority: nil }.to_json }
      before { post '/admin/favorites', params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /admin/favorites/:id' do
    let(:valid_attributes) { { name: 'Mozart' }.to_json }

    before { put "/admin/favorites/#{id}", params: valid_attributes, headers: headers }

    context 'when favorite exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the favorite' do
        updated_favorite = Favorite.find(id)
        expect(updated_favorite.name).to match(/Mozart/)
      end
    end

    context 'when the favorite does not exist' do
      let(:id) { 0 }.to_json

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Favorite/)
      end
    end
  end

  describe 'DELETE /admin/favorites/:id' do
    before { delete "/admin/favorites/#{id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
