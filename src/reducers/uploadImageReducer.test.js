import reducer, { initialState } from './uploadImageReducer';
import { uploadImageRequest, uploadImageSuccess, uploadImageFailure } from '../actions';

describe('uploadImageReducer reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('uploadImageRequest action should work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, uploadImageRequest());
    const expected = { ...initialState, loading: true };
    expect(actual).toEqual(expected);
  });

  it('uploadImageRequest action should not work', () => {
    const state = { ...initialState, loading: false };
    const actual = reducer(state, uploadImageRequest());
    const expected = { ...initialState, loading: false };
    expect(actual).not.toEqual(expected);
  });

  it('uploadImageSuccess action should work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const imageurl = ['Meals'];
    const actual = reducer(state, uploadImageSuccess(imageurl));
    const expected = {
      ...initialState, loading: false, imageurl: ['Meals'], error: '',
    };
    expect(actual).toEqual(expected);
  });

  it('uploadImageSuccess action should not work', () => {
    const state = { ...initialState, loading: true, error: '404 Page not fonud' };
    const imageurl = ['Meals'];
    const actual = reducer(state, uploadImageSuccess(imageurl));
    const expected = {
      ...initialState, loading: false, imageurl: [''], error: '',
    };
    expect(actual).not.toEqual(expected);
  });

  it('uploadImageFailure action should work', () => {
    const state = { ...initialState, loading: true, imageurl: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, uploadImageFailure(error));
    const expected = { ...initialState, error: '404 Page not fonud' };
    expect(actual).toEqual(expected);
  });

  it('uploadImageFailure action should not work', () => {
    const state = { ...initialState, loading: true, imageurl: ['Meals'] };
    const error = '404 Page not fonud';
    const actual = reducer(state, uploadImageFailure(error));
    const expected = { ...initialState, error: '' };
    expect(actual).not.toEqual(expected);
  });
});
