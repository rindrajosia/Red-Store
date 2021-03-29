import reducer, { initialState } from './favoriteProductFetchReducer';
import { fetchFavoriteProductsRequest, fetchFavoriteProductsSuccess, fetchFavoriteProductsFailure } from '../actions';

describe('favoriteProductFetchReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('favoriteProductFetchReducer action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchFavoriteProductsRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoriteProductsRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchFavoriteProductsRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('fetchFavoriteProductsSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const favoritesProduct = ['Meals'];
    const actual = reducer(state, fetchFavoriteProductsSuccess(favoritesProduct));
    const expected = {
      ...initialState, loading: false, favorites_products: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoriteProductsSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const favoritesProduct = ['Meals'];
    const actual = reducer(state, fetchFavoriteProductsSuccess(favoritesProduct));
    const expected = {
      ...initialState, loading: false, favorites_products: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('fetchFavoriteProductsFailure action should work', () => {
    const state = { ...initialState, loading: true, favorites_products: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchFavoriteProductsFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoriteProductsFailure action should not work', () => {
    const state = { ...initialState, loading: true, favorites_products: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchFavoriteProductsFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
