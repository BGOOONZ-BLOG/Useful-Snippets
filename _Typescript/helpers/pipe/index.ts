/**
  pipe(fn1, fn2, fn3)(value) is equivalent to fn3(fn2(fn1(value)))
  https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i
*/

const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: ((a: R) => R)[]) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    value => value
  );
  return (...args: T) => piped(fn1(...args));
};

export default pipe;
