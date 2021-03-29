import reducer, { initialState } from './createFavoriteProductReducer';
import { createFavoriteProductRequest, createFavoriteProductSuccess, createFavoriteProductFailure } from '../actions';

describe('createFavoriteProductReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('createFavoriteProductRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createFavoriteProductRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteProductRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createFavoriteProductRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('createFavoriteProductSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createFavoriteProductSuccess(message));
    const expected = {
      ...initialState, loading: false, message: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteProductSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createFavoriteProductSuccess(message));
    const expected = {
      ...initialState, loading: false, message: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('createFavoriteProductFailure action should work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createFavoriteProductFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('createFavoriteProductFailure action should not work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createFavoriteProductFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
