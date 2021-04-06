import filter, { initialState } from './filterFavorite';
import { changeFilterFavorite } from '../actions';

describe('filterFavorite reducer', () => {
  it('should return the initial state', () => {
    const actual = filter(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('should not return the initial state', () => {
    const actual = filter('Test', {});
    const expected = initialState;
    expect(actual).not.toEqual(expected);
  });

  it('changeFilterFavorite action should work', () => {
    const key = 'Vegan';
    const actual = filter(initialState, changeFilterFavorite(key));
    const expected = 'Vegan';
    expect(actual).toEqual(expected);
  });

  it('changeFilterFavorite action should not work', () => {
    const actual = filter(initialState, {});
    const expected = 'Vegan';
    expect(actual).not.toEqual(expected);
  });
});
