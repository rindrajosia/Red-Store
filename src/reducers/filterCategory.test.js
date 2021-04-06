import filter, { initialState } from './filterCategory';
import { changeFilterCategory } from '../actions';

describe('filterCategory reducer', () => {
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

  it('changeFilterCategory action should work', () => {
    const key = 'Vegan';
    const actual = filter(initialState, changeFilterCategory(key));
    const expected = 'Vegan';
    expect(actual).toEqual(expected);
  });

  it('changeFilterCategory action should not work', () => {
    const actual = filter(initialState, {});
    const expected = 'Vegan';
    expect(actual).not.toEqual(expected);
  });
});
