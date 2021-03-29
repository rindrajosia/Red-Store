import reducer, { initialState } from './updateFavoriteReducer';
import { updateFavoriteRequest, updateFavoriteSuccess, updateFavoriteFailure } from '../actions';

describe('updateFavoriteReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('updateFavoriteRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, updateFavoriteRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('updateFavoriteRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, updateFavoriteRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('updateFavoriteSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, updateFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('updateFavoriteSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, updateFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('updateFavoriteFailure action should work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, updateFavoriteFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('updateFavoriteFailure action should not work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, updateFavoriteFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
