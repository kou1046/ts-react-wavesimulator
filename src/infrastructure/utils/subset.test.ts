import nj from "numjs";
import { test, expect, describe } from "@jest/globals";

import { SizeError, getSubset, setSubset } from "./subset";

const testArray = nj.array<number[]>([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

describe("getSubset, setSubset関数の単体テスト", () => {
  test("指定したインデックス(x, y)の値を配列として取り出す", () => {});
  const actualSubsetArray = getSubset(testArray, [
    [0, 1, 2],
    [0, 1, 2],
  ]);

  const expectedSubsetArray = nj.array<number>([1, 5, 9]);

  expect(actualSubsetArray.tolist()).toEqual(expectedSubsetArray.tolist());
  test("指定したインデックス(x, y)の値を第3引数の値に置き換える", () => {
    setSubset(
      testArray,
      [
        [0, 1, 2],
        [0, 1, 2],
      ],
      [-1, -1, -1]
    );
    const expectedSettedArray = nj.array<number[]>([
      [-1, 2, 3],
      [4, -1, 6],
      [7, 8, -1],
    ]);

    expect(testArray.tolist()).toEqual(expectedSettedArray.tolist());
  });
  test("要素の数が間違っているときにエラーを吐く", () => {
    expect(() =>
      setSubset(
        testArray,
        [
          [0, 2],
          [0, 1],
        ],
        [1, 2, 3]
      )
    ).toThrow(SizeError);
  });
});
