import { combineReducers } from 'redux';
import userFetchReducer from './userFetchReducer';
import categoryFetchReducer from './categoryFetchReducer';
import favoriteFetchReducer from './favoriteFetchReducer';
import favoriteProductFetchReducer from './favoriteProductFetchReducer';
import productFetchReducer from './productFetchReducer';
import createFavoriteProductReducer from './createFavoriteProductReducer';
import createFavoriteReducer from './createFavoriteReducer';
import createProductReducer from './createProductReducer';
import deleteFavoriteReducer from './deleteFavoriteReducer';
import deleteProductReducer from './deleteProductReducer';
import updateFavoriteReducer from './updateFavoriteReducer';
import updateProductReducer from './updateProductReducer';
import filterCategory from './filterCategory';
import filterFavorite from './filterFavorite';
import uploadImageReducer from './uploadImageReducer';

export default combineReducers({
  user: userFetchReducer,
  categoryFetch: categoryFetchReducer,
  favoriteFetch: favoriteFetchReducer,
  favoriteProductFetch: favoriteProductFetchReducer,
  productFetch: productFetchReducer,
  createFavoriteProduct: createFavoriteProductReducer,
  createFavorite: createFavoriteReducer,
  createProduct: createProductReducer,
  deleteFavorite: deleteFavoriteReducer,
  deleteProduct: deleteProductReducer,
  updateFavorite: updateFavoriteReducer,
  updateProduct: updateProductReducer,
  filterCategory: filterCategory,
  filterFavorite: filterFavorite,
  uploadImage: uploadImageReducer,
});
