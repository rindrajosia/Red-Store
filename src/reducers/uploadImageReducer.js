import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  imageurl: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        imageurl: action.payload,
        error: '',
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        imageurl: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
