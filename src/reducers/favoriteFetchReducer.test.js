import reducer, { initialState } from './favoriteFetchReducer';
import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure } from '../actions';

describe('favoriteReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('fetchFavoritesRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchFavoritesRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoritesRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchFavoritesRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('fetchFavoritesSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const favorite = ['Meals'];
    const actual = reducer(state, fetchFavoritesSuccess(favorite));
    const expected = {
      ...initialState, loading: false, favorites: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoritesSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const favorite = ['Meals'];
    const actual = reducer(state, fetchFavoritesSuccess(favorite));
    const expected = {
      ...initialState, loading: false, favorites: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('fetchFavoritesFailure action should work', () => {
    const state = { ...initialState, loading: true, favorites: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchFavoritesFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoritesFailure action should not work', () => {
    const state = { ...initialState, loading: true, favorites: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchFavoritesFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
