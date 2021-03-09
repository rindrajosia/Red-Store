import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  user: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
