export function* eachCons<T>(arr: T[], num: number) {
  for (let counter = 0; counter <= arr.length - num; counter++)
    yield arr.slice(counter, counter + num);
}
