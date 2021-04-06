import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  user: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    case CREATE_USER_FAILURE:
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
