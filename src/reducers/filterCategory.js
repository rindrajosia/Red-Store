import { CHANGE_FILTER_CATEGORY } from '../actions/actionTypes';
import { CATEGORY_FILTERS } from '../constants';

export const initialState = CATEGORY_FILTERS.ALL;

const filterCategory = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_CATEGORY: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default filterCategory;
