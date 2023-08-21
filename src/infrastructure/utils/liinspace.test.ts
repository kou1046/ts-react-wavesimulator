import { describe, test, expect } from "@jest/globals";
import { linspace } from "./linspace";
import { tile } from "./tile";

describe("linspaceの単体テスト", () => {
  test("要素数の確認", () => {
    const actualArray = linspace(0, 1, 100);
    const actualShape = actualArray.shape;

    expect(actualShape[0]).toBe(100);
  });

  test("stopが小数の時の要素数確認", () => {
    const actualArray = linspace(0, 1.3, 100);
    const actualShape = actualArray.shape;

    expect(actualShape[0]).toBe(100);
  });

  test("tileと組み合わせた時の次元数確認", () => {
    const rangeArray = linspace(0, 1, 100).reshape<number[]>(1, -1);
    const rangeArrayAddedDim = tile(rangeArray, [10, 0]);

    expect(rangeArrayAddedDim.shape).toEqual([10 + 1, 100]);
  });
});
