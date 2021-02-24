require 'rails_helper'

RSpec.describe 'Favorites', type: :request do
  let!(:user) { create(:user) }
  let!(:favorites) { create_list(:favorite, 20, user_id: user.id) }
  let(:user_id) { user.id }
  let(:id) { favorites.first.id }

  describe 'GET /users/:user_id/favorites' do
    before { get "/users/#{user_id}/favorites" }

    context 'when user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all user favorites' do
        expect(json.size).to eq(20)
      end
    end

    context 'when user does not exist' do
      let(:user_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  describe 'GET /users/:user_id/favorites/:id' do
    before { get "/users/#{user_id}/favorites/#{id}" }

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

  describe 'POST /users/:user_id/favorites' do
    let(:valid_attributes) { { name: 'Visit Narnia', priority: 1 } }

    context 'when request attributes are valid' do
      before { post "/users/#{user_id}/favorites", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/users/#{user_id}/favorites", params: {} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /users/:user_id/favorites/:id' do
    let(:valid_attributes) { { name: 'Mozart' } }

    before { put "/users/#{user_id}/favorites/#{id}", params: valid_attributes }

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
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Favorite/)
      end
    end
  end

  describe 'DELETE /users/:id' do
    before { delete "/users/#{user_id}/favorites/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
