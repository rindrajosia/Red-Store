import { CHANGE_FILTER_FAVORITE } from '../actions/actionTypes';
import { FAVORITE_FILTERS } from '../constants';

export const initialState = FAVORITE_FILTERS.ALL;

const filterFavorite = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_FAVORITE: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default filterFavorite;
