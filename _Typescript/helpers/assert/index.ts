const assertElement: { <T>(value: T | null | undefined): asserts value is T } = (value: any) => {
  if (value instanceof Element) {
    return;
  }
  throw new Error('ref is not an Element');
};

export { assertElement };
