import nj from "numjs";
import { describe } from "@jest/globals";

import { tile } from "./tile";
import { AxisError } from "./tile";

const sampleArray = nj.array<number[]>([[1, 2, 3]]);

describe("tile関数のテスト", () => {
  test("縦方向(axis=0)方向に, 配列を2回tile(複製)する", () => {
    const actualTiledArray = tile(sampleArray, [2, 0]);
    const expectedTiledArray = nj.array<number[]>([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);

    expect(actualTiledArray.tolist()).toEqual(expectedTiledArray.tolist());
  });

  test("横方向(axis=1)方向に, 配列を3回tile(複製する)", () => {
    const actualTiledArray = tile(sampleArray, [0, 3]);
    const expectedTiledArray = nj.array<number[]>([
      [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    ]);

    expect(actualTiledArray.tolist()).toEqual(expectedTiledArray.tolist());
  });

  test("縦方向に1回, 横方向に2回tileする", () => {
    const actualTiledArray = tile(sampleArray, [1, 2]);
    const expectedTiledArray = nj.array([
      [1, 2, 3, 1, 2, 3, 1, 2, 3],
      [1, 2, 3, 1, 2, 3, 1, 2, 3],
    ]);

    expect(actualTiledArray.tolist()).toEqual(expectedTiledArray.tolist());
  });

  test("reps引数の例外スロー", () => {
    expect(() => tile(sampleArray, [-1, 0])).toThrow(AxisError);
    expect(() => tile(sampleArray, [0, -3])).toThrow(AxisError);
    expect(() => tile(sampleArray, [-1, -3])).toThrow(AxisError);
    expect(() => tile(sampleArray, [0.1, 0.2])).toThrow(AxisError);
    expect(() => tile(sampleArray, [-0.1, 0])).toThrow(AxisError);
  });
});
