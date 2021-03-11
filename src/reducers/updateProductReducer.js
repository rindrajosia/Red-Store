import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  message: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: '',
      };
    case UPDATE_PRODUCT_FAILURE:
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
