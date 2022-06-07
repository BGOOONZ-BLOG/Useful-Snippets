import { createStoryOptions, getChild, makeClasses } from './index';

describe('createStoryOptions', () => {
  const data = {
    array: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
  };
  it('returns the correct length of options given an certain number', () => {
    const assert1 = createStoryOptions(data.array, 2);
    const assert2 = createStoryOptions(data.array, 4);
    const assert3 = createStoryOptions(data.array, 8);
    const assert4 = createStoryOptions(data.array);
    expect(Object.keys(assert1).length).toEqual(2);
    expect(Object.keys(assert2).length).toEqual(4);
    expect(Object.keys(assert3).length).toEqual(8);
    expect(Object.keys(assert4).length).toEqual(data.array.length);
  });
});

describe('getChild', () => {
  it('returns child entries from the source array that match the parentId', () => {
    const assert1 = getChild([{ params: { parent: 'a' } }, { params: { parent: 'b' } }])('a');
    const assert2 = getChild([{ params: { parent: 'b' } }, { params: { parent: 'b' } }])('b');
    const assert3 = getChild([{ params: { parent: 'b' } }, { params: { parent: 'b' } }])('c');
    const assert4 = getChild([{ foo: 'bar' }, { foo: 'baz' }])('c');

    expect(assert1).toStrictEqual([{ params: { parent: 'a' } }]);
    expect(assert2).toStrictEqual([{ params: { parent: 'b' } }, { params: { parent: 'b' } }]);
    expect(assert3).toStrictEqual([]);
    expect(assert4).toStrictEqual([]);
  });
});

describe('makeClasses', () => {
  it('takes an array of classes and a string prefix and returns a single class string', () => {
    const assert1 = makeClasses(['small'], 'de-component--');
    const assert2 = makeClasses(['tan', 'thin'], 'de-component--');
    const assert3 = makeClasses(['tan', 'thin'], 'de-button--');

    expect(assert1).toBe('de-component--small');
    expect(assert2).toBe('de-component--tan de-component--thin');
    expect(assert3).toBe('de-button--tan de-button--thin');
  });
});
