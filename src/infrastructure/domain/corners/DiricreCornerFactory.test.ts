import { describe, expect, test } from "@jest/globals";
import { diricreCornerFactory } from "./DiricreCornerFactory";
import {
  DiricreTopWall,
  DiricreBottomWall,
  DiricreLeftWall,
  DiricreRightWall,
} from "../walls/DiricreWall";
import {
  LeftTopCorner,
  RightBottomCorner,
  RightTopCorner,
  LeftBottomCorner,
} from "./Corner";

describe("固定端角生成器の単体テスト", () => {
  test("時計回りの順番でかつ, 垂直に交わる2つの壁を渡したときに適切な向きの角を生成できる", () => {
    const width = 3;
    const height = 3;

    const bottomWall = new DiricreBottomWall([width, 0], [0, 0]);
    const leftWall = new DiricreLeftWall([0, 0], [0, height]);
    const topWall = new DiricreTopWall([0, width], [height, height]);
    const rightWall = new DiricreRightWall([width, width], [height, 0]);

    expect(diricreCornerFactory.create(bottomWall, leftWall)).toBeInstanceOf(
      LeftBottomCorner
    );
    expect(diricreCornerFactory.create(leftWall, topWall)).toBeInstanceOf(
      LeftTopCorner
    );
    expect(diricreCornerFactory.create(topWall, rightWall)).toBeInstanceOf(
      RightTopCorner
    );
    expect(diricreCornerFactory.create(rightWall, bottomWall)).toBeInstanceOf(
      RightBottomCorner
    );
  });
  test("時計回りの順番でかつ, 垂直に交わる2つの壁を渡したときに適切な向きの角を生成できる", () => {
    const bottomWall = new DiricreBottomWall([0.5, 1.0], [0.7, 1.0]);
    const leftWall = new DiricreLeftWall([0.7, 1.0], [0.7, 0.7]);
    const bottomWall2 = new DiricreBottomWall([0.7, 0.7], [1.0, 0.7]);

    const leftWall2 = new DiricreLeftWall([1.0, 0.7], [1.0, 0.2]);
    const topWall = new DiricreTopWall([1.0, 0.2], [0.5, 0.2]);
    const rightWall2 = new DiricreRightWall([0.5, 0.2], [0.5, 1.0]);

    expect(diricreCornerFactory.create(bottomWall, leftWall)).toBeNull();
    expect(diricreCornerFactory.create(leftWall, bottomWall2)).toBeInstanceOf(
      LeftBottomCorner
    );
    expect(diricreCornerFactory.create(bottomWall2, leftWall2)).toBeNull();
    expect(diricreCornerFactory.create(leftWall2, topWall)).toBeNull();
    expect(diricreCornerFactory.create(topWall, rightWall2)).toBeNull();
    expect(diricreCornerFactory.create(rightWall2, bottomWall)).toBeNull();
  });
});
