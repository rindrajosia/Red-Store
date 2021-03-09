import {
  FETCH_FAVORITE_PRODUCTS_REQUEST,
  FETCH_FAVORITE_PRODUCTS_SUCCESS,
  FETCH_FAVORITE_PRODUCTS_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  favorites_products: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAVORITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites_products: action.payload,
        error: '',
      };
    case FETCH_FAVORITE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        favorites_products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
