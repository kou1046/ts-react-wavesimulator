export const range = function* (start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
};
