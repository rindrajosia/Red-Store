import { combineReducers } from 'redux';
import userFetchReducer from './userFetchReducer';
import categoryFetchReducer from './categoryFetchReducer';
import favoriteFetchReducer from './favoriteFetchReducer';
import productFetchReducer from './productFetchReducer';
import createFavoriteReducer from './createFavoriteReducer';
import createProductReducer from './createProductReducer';
import deleteFavoriteReducer from './deleteFavoriteReducer';
import deleteProductReducer from './deleteProductReducer';
import updateProductReducer from './updateProductReducer';
import filterCategory from './filterCategory';
import filterFavorite from './filterFavorite';
import uploadImageReducer from './uploadImageReducer';
import productByIdFetchReducer from './productByIdFetchReducer';

export default combineReducers({
  user: userFetchReducer,
  categoryFetch: categoryFetchReducer,
  favoriteFetch: favoriteFetchReducer,
  productFetch: productFetchReducer,
  productByIdFetch: productByIdFetchReducer,
  createFavorite: createFavoriteReducer,
  createProduct: createProductReducer,
  deleteFavorite: deleteFavoriteReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  filterCategory,
  filterFavorite,
  uploadImage: uploadImageReducer,
});
