import reducer, { initialState } from './userFetchReducer';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../actions';

describe('userFetchReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('userFetchReducer action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchUserRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('fetchUserRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchUserRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('fetchUserSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const user = ['Meals'];
    const actual = reducer(state, fetchUserSuccess(user));
    const expected = {
      ...initialState, loading: false, user: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('fetchUserSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const user = ['Meals'];
    const actual = reducer(state, fetchUserSuccess(user));
    const expected = {
      ...initialState, loading: false, user: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('fetchUserFailure action should work', () => {
    const state = { ...initialState, loading: true, user: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchUserFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('fetchUserFailure action should not work', () => {
    const state = { ...initialState, loading: true, user: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchUserFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
