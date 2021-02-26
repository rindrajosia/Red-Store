require 'rails_helper'

RSpec.describe 'Categories', type: :request do
  let!(:categories) { create_list(:category, 10) }
  let(:category_id) { categories.first.id }
  let(:user) { create(:user, admin: true) }

  let(:headers) { valid_headers }

  describe 'GET /admin/categories' do
    before { get '/admin/categories', params: {}, headers: headers }
    it 'returns categories' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /admin/categories/:id' do
    before { get "/admin/categories/#{category_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the category' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(category_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:category_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Category/)
      end
    end
  end

  describe 'POST /admin/categories' do
    let(:valid_attributes) { { name: 'Learn Elm' }.to_json }

    context 'when the request is valid' do
      before { post '/admin/categories', params: valid_attributes, headers: headers }

      it 'creates a category' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { { name: nil }.to_json }
      before { post '/admin/categories', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /admin/categories/:id' do
    let(:valid_attributes) { { name: 'E-tech' }.to_json }

    context 'when the record exists' do
      before { put "/admin/categories/#{category_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /admin/categories/:id' do
    before { delete "/admin/categories/#{category_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
