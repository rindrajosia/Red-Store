import {
  CREATE_FAVORITE_PRODUCT_REQUEST,
  CREATE_FAVORITE_PRODUCT_SUCCESS,
  CREATE_FAVORITE_PRODUCT_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  message: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FAVORITE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FAVORITE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: '',
      };
    case CREATE_FAVORITE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        message: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
