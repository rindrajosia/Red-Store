import reducer, { initialState } from './productByIdFetchReducer';
import { fetchProductRequest, fetchProductSuccess, fetchProductFailure } from '../actions';

describe('productByIdFetchReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('fetchProductRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchProductRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('fetchProductRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, fetchProductRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('fetchProductSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const product = ['Meals'];
    const actual = reducer(state, fetchProductSuccess(product));
    const expected = {
      ...initialState, loading: false, product: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('fetchFavoriteProductsSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const product = ['Meals'];
    const actual = reducer(state, fetchProductSuccess(product));
    const expected = {
      ...initialState, loading: false, product: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('fetchProductFailure action should work', () => {
    const state = { ...initialState, loading: true, product: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchProductFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('fetchProductFailure action should not work', () => {
    const state = { ...initialState, loading: true, product: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, fetchProductFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
