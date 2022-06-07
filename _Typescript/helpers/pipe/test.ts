import pipe from './index';

describe('pipe', () => {
  it('sequentially applies functions', () => {
    const transform1 = (s: string) => s.replace('weasel', 'cat');
    const transform2 = (s: string) => s.replace('cat', 'dog');
    const transform3 = (s: string) => s.replace('dog', 'ferret');

    const assert = pipe(transform1, transform2, transform3)('weasel');

    expect(assert).toBe('ferret');
  });
});
