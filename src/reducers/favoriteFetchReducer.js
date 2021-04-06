import {
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  favorites: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.payload,
        error: '',
      };
    case FETCH_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        favorites: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
