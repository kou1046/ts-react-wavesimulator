import { describe, expect, test } from "@jest/globals";
import { topShift, rightShift, bottomShift, leftShift } from "./shift";
import nj from "numjs";

const sampleArray = nj.array<number[]>([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

describe("各shift関数の動作テスト", () => {
  test("2次元配列を上に1段ずらす", () => {
    const actualShifttedArray = topShift(sampleArray);
    const expectedShifteedArray = nj.array<number[]>([
      [4, 5, 6],
      [7, 8, 9],
      [0, 0, 0],
    ]);

    expect(expectedShifteedArray.tolist()).toEqual(
      actualShifttedArray.tolist()
    );
  });

  test("2次元配列を右に1段ずらす", () => {
    const actualShifttedArray = rightShift(sampleArray);
    const expectedShifteedArray = nj.array<number[]>([
      [0, 1, 2],
      [0, 4, 5],
      [0, 7, 8],
    ]);

    expect(expectedShifteedArray.tolist()).toEqual(
      actualShifttedArray.tolist()
    );
  });

  test("2次元配列を左に1段ずらす", () => {
    const actualShifttedArray = leftShift(sampleArray);
    const expectedShifteedArray = nj.array<number[]>([
      [2, 3, 0],
      [5, 6, 0],
      [8, 9, 0],
    ]);

    expect(expectedShifteedArray.tolist()).toEqual(
      actualShifttedArray.tolist()
    );
  });

  test("2次元配列を下に1段ずらす", () => {
    const actualShifttedArray = bottomShift(sampleArray);
    const expectedShifteedArray = nj.array<number[]>([
      [0, 0, 0],
      [1, 2, 3],
      [4, 5, 6],
    ]);

    expect(expectedShifteedArray.tolist()).toEqual(
      actualShifttedArray.tolist()
    );
  });
});
