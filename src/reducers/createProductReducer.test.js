import reducer, { initialState } from './createProductReducer';
import { createProductRequest, createProductSuccess, createProductFailure } from '../actions';

describe('createProductReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('createProductRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createProductRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('createProductRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, createProductRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('createProductSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createProductSuccess(message));
    const expected = {
      ...initialState, loading: false, message: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('createProductSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const message = ['Meals'];
    const actual = reducer(state, createProductSuccess(message));
    const expected = {
      ...initialState, loading: false, message: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('createProductFailure action should work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createProductFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('createProductFailure action should not work', () => {
    const state = { ...initialState, loading: true, message: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, createProductFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
