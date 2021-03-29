import reducer, { initialState } from './createFavoriteReducer';
import { createFavoriteRequest, createFavoriteSuccess, createFavoriteFailure } from '../actions';

describe('createFavoriteReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('createFavoriteRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createFavoriteRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createFavoriteRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('createFavoriteSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createFavoriteSuccess(message));
    const expected = {
      ...initialState, loading: false, message: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('createFavoriteFailure action should work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createFavoriteFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteFailure action should not work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createFavoriteFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
