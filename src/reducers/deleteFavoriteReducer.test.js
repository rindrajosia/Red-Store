import reducer, { initialState } from './deleteFavoriteReducer';
import { deleteFavoriteRequest, deleteFavoriteSuccess, deleteFavoriteFailure } from '../actions';

describe('deleteFavoriteReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('deleteFavoriteRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, deleteFavoriteRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('deleteFavoriteRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, deleteFavoriteRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('deleteFavoriteSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, deleteFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('deleteFavoriteSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, deleteFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('deleteFavoriteFailure action should work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, deleteFavoriteFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('deleteFavoriteFailure action should not work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, deleteFavoriteFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
