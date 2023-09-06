const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const asyncPipe =
  (...fns) =>
  (x) =>
    fns.reduce(async (v, f) => f(await v), x);
export { pipe, asyncPipe };
