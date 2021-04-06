import reducer, { initialState } from './productFetchReducer';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../actions';

describe('fetchProductsRequest reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('fetchProductsRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchProductsRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('fetchProductsRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchProductsRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('fetchProductsSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const product = ['Meals'];
    const actual = reducer(state, fetchProductsSuccess(product));
    const expected = {
      ...initialState, loading: false, products: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('fetchProductsSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const product = ['Meals'];
    const actual = reducer(state, fetchProductsSuccess(product));
    const expected = {
      ...initialState, loading: false, products: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('fetchProductsFailure action should work', () => {
    const state = { ...initialState, loading: true, products: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchProductsFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('fetchProductsFailure action should not work', () => {
    const state = { ...initialState, loading: true, products: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchProductsFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
