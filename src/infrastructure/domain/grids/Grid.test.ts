import nj from "numjs";
import { expect, test, describe } from "@jest/globals";
import { Grid, ValueError, CFLConditionError } from "./Grid";
import { range } from "../../utils/range";

const WIDTH = 5;
const HEIGHT = 1;
const H = 0.05;
const DT = 0.01;
const testGrid = new Grid(WIDTH, HEIGHT, H, DT);

describe("Gridの単体テスト", () => {
  test("座標を指定したとき，座標に対応する格子インデックスを取得できる", () => {
    const actualXIndex = testGrid.calculateXIndex(WIDTH);
    const actualYIndex = testGrid.calculateYIndex(HEIGHT);
    const zeros = testGrid.generateArray();
    const [expectedXIndex, expectedYIndex] = zeros.shape.map((v) => v - 1);

    const actualXIndex2 = testGrid.calculateXIndex(0);
    const actualYIndex2 = testGrid.calculateYIndex(0);
    const [expectedXIndex2, expectedYIndex2] = [0, 0];

    const actualXIndex3 = testGrid.calculateXIndex(WIDTH / 2);
    const actualYIndex3 = testGrid.calculateYIndex(HEIGHT / 2);
    const [expectedXIndex3, expectedYIndex3] = [
      WIDTH / 2 / H - 1,
      HEIGHT / 2 / H - 1,
    ];

    expect([actualXIndex, actualYIndex]).toEqual([
      expectedXIndex,
      expectedYIndex,
    ]);

    expect([actualXIndex2, actualYIndex2]).toEqual([
      expectedXIndex2,
      expectedYIndex2,
    ]);

    expect([actualXIndex3, actualYIndex3]).toEqual([
      expectedXIndex3,
      expectedYIndex3,
    ]);
  });

  test("最大幅（高さ）を超えた座標を指定したとき，エラーを出せる", () => {
    const overWidth = WIDTH + 0.2;
    const overHeight = HEIGHT + 1;

    expect(() => {
      testGrid.calculateXIndex(overWidth);
    }).toThrow(ValueError);
    expect(() => {
      testGrid.calculateYIndex(overHeight);
    }).toThrow(ValueError);
  });

  test("クーラン条件を満たしてない場合，コンストラクタでエラーを出せる", () => {
    const illegalCFLConditions: [number, number] = [0.01, 0.05];

    expect(() => {
      new Grid(WIDTH, HEIGHT, ...illegalCFLConditions);
    }).toThrow(CFLConditionError);
  });
});
